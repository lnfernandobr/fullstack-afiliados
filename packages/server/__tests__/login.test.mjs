import app from '../app';

import { sequelize, Token, User } from '../models';

import request from 'supertest';

describe('Tests for the /signup endpoint', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  test('You must successfully create a new user', async () => {
    const response = await request(app)
      .post('/users/signup')
      .send({
        name: 'Teste',
        email: 'teste@teste.com',
        password: '123456',
      })
      .expect(200);

    expect(response.body.name).toBe('Teste');
    expect(response.body.email).toBe('teste@teste.com');
    expect(response.body.password).toBeDefined();

    const user = await User.findOne({
      where: {
        email: 'teste@teste.com',
      },
    });

    expect(user).toBeTruthy();
  });

  test('It must not allow the creation of a user with the same email', async () => {
    const existingUser = await User.create({
      name: 'Usuário Existente',
      email: 'existente@teste.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/users/signup')
      .send({
        name: 'Teste',
        email: 'existente@teste.com',
        password: '123456',
      })
      .expect(409);

    expect(response.body.message).toBe('Usuário já existe');
  });

  test('Must login successfully', async () => {
    const password = '123456';

    await User.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password,
    });

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'teste@teste.com',
        password,
      })
      .expect(200);

    expect(response.body.token).toBeDefined();

    const token = await Token.findOne({
      where: {
        token: response.body.token,
      },
    });

    expect(token).toBeTruthy();
  });

  test('Must not login with invalid email', async () => {
    const password = '123456';
    await User.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password,
    });

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'naoexiste@teste.com',
        password,
      })
      .expect(401);

    expect(response.body.message).toBe('Usuário não encontrado');
  });

  test('Must not login with invalid password', async () => {
    const password = '123456';
    await User.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password,
    });

    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'teste@teste.com',
        password: 'senhaerrada',
      })
      .expect(401);

    expect(response.body.message).toBe('Senha inválida');
  });
});
