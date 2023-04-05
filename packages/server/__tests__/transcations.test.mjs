import {
  Affiliate,
  Creator,
  Product,
  sequelize,
  Transaction,
} from '../models/index.mjs';
import { saveTransactions } from '../controllers/TranscationController.mjs';

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
});
