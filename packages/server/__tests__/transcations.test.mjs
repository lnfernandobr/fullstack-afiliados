import {
  Affiliate,
  Creator,
  Product,
  sequelize,
  Transaction,
} from '../models/index.mjs';
import { saveTransactions } from '../controllers/TranscationController.mjs';
import { parseFileContent } from '../utils.mjs';

describe.only('saveTransactions', () => {
  let creator, product, affiliate;

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  beforeAll(async () => {
    creator = await Creator.create({ name: 'Creator Test' });
    product = await Product.create({
      name: 'Product Test',
      creatorId: creator.id,
    });
    affiliate = await Affiliate.create({ name: 'Affiliate Test' });
  });

  afterEach(async () => {
    await Transaction.destroy({ truncate: true });
  });

  it('should save a productor sale transaction', async () => {
    const transactions = [
      {
        seller: creator.name,
        type: 1,
        product: product.name,
        date: new Date(),
        value: 50,
      },
    ];

    await saveTransactions({ transactions, userId: 1 });

    const transaction = await Transaction.findOne({
      where: {
        type: 1,
        productId: product.id,
      },
    });

    expect(transaction).toBeTruthy();
    expect(transaction.value).toEqual(50);
  });

  it('should save a product comission transaction', async () => {
    const transactions = [
      {
        seller: creator.name,
        type: 4,
        product: product.name,
        date: new Date(),
        value: 5,
      },
    ];

    await saveTransactions({ transactions, userId: 1 });

    const transaction = await Transaction.findOne({
      where: {
        type: 4,
        productId: product.id,
      },
    });

    expect(transaction).toBeTruthy();
    expect(transaction.value).toEqual(-5);
  });

  it.only('should save the trascaoes based on sales.txt and the sum of producers/affiliates should match the hope', async () => {
    const parsedFile =
      parseFileContent(`12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA
32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA
42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS
12022-01-22T08:59:13-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
12022-02-01T23:35:43-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
22022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000155000CARLOS BATISTA
22022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000155000CAROLINA MACHADO
22022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000155000CELSO DE MELO
32022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000050000CARLOS BATISTA
32022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000050000CAROLINA MACHADO
32022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000050000CELSO DE MELO
42022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
42022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
42022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
12022-02-19T05:33:07-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
12022-03-01T02:09:54-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12022-03-03T09:07:35-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
12022-03-03T13:12:16-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
`);

    await saveTransactions({ transactions: parsedFile, userId: 1 });
    const transactionsDb = await Transaction.findAll({});

    const creators = {};
    const affiliates = {};

    transactionsDb.forEach((transaction) => {
      if (transaction.creatorId) {
        creators[transaction.creatorId] =
          transaction.value + (creators[transaction.creatorId] || 0);
      }
      if (transaction.affiliateId) {
        affiliates[transaction.affiliateId] =
          transaction.value + (affiliates[transaction.affiliateId] || 0);
      }
    });

    const thiagoAffiliateId = 1;
    const carlosAffiliateId = 2;
    const carolinaAffiliateId = 3;
    const celsoAffiliateId = 4;

    const joseCreatorId = 1;
    const mariaCreatorId = 2;
    const elianaCreatorID = 3;

    expect(affiliates[thiagoAffiliateId]).toBe(4500);
    expect(affiliates[celsoAffiliateId]).toBe(50000);
    expect(affiliates[carolinaAffiliateId]).toBe(50000);
    expect(affiliates[carlosAffiliateId]).toBe(50000);

    expect(creators[joseCreatorId]).toBe(33750);
    expect(creators[mariaCreatorId]).toBe(150000);
    expect(creators[elianaCreatorID]).toBe(780000);
  });
});
