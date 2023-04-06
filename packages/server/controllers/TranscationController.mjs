import { Creator, Product, sequelize } from '../models/index.mjs';
import { TRANSACTIONS_METHODS } from './Transaction.utils.mjs';

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user;
    const transactions = await sequelize.query(
      `SELECT creators.name as seller, 'creator' as type, products.name as product, NULL as affiliate, SUM(Transactions.value) as value FROM Creators creators INNER JOIN Transactions ON creators.id = Transactions.creatorId INNER JOIN Products products ON products.id = Transactions.productId WHERE Transactions.userId = ${userId} GROUP BY creators.id, products.id UNION ALL SELECT affiliates.name as seller, 'affiliate' as type, products.name as product, NULL as affiliate, SUM(Transactions.value) as value FROM Affiliates affiliates INNER JOIN Transactions ON affiliates.id = Transactions.affiliateId INNER JOIN Products products ON products.id = Transactions.productId WHERE Transactions.userId = ${userId} GROUP BY affiliates.id, products.id ORDER BY seller, type;`,
      {
        type: sequelize.QueryTypes.SELECT,
      },
    );
    res.json({ transactions: transactions });
  } catch (err) {
    res.status(500).send('Error fetching transactions');
  }
};

export const saveTransactions = async ({ transactions, userId }) => {
  const PRODUCTOR_SALE = 1;
  const AFFILIATE_SALE = 2;
  const AFFILIATE_COMISSION = 3;
  const PRODUCT_COMISSION = 4;

  const getProductDb = async (transaction) => {
    const productDb = await Product.findOne({
      where: { name: transaction.product },
    });

    if (!productDb && transaction.type !== PRODUCTOR_SALE) {
      throw new Error(
        'Você está tentando sincronizar a transação de um afiliado, mas, as informações do produtor e do produto não foram sincronizadas ainda. Você precisa primeira, enviar as tranções do produtor.',
      );
    }
    return productDb;
  };

  for (const transaction of transactions) {
    switch (transaction.type) {
      case PRODUCTOR_SALE: {
        const creatorDb = await TRANSACTIONS_METHODS.createOrFindCreator({
          name: transaction.seller,
        });
        const product = await TRANSACTIONS_METHODS.saveProductIfDontExists({
          name: transaction.product,
          creatorId: creatorDb.id,
        });
        await TRANSACTIONS_METHODS.createTransaction({
          date: new Date(transaction.date),
          creatorId: creatorDb.id,
          productId: product.id,
          type: transaction.type,
          userId,
          value: transaction.value,
        });
        break;
      }

      case AFFILIATE_SALE: {
        const productDb = await getProductDb(transaction);
        const affiliateDb = await TRANSACTIONS_METHODS.createOrFindAffiliate({
          name: transaction.seller,
        });
        const creatorDb = await Creator.findOne({
          where: { id: productDb.creatorId },
        });
        await TRANSACTIONS_METHODS.createTransaction({
          date: new Date(transaction.date),
          value: transaction.value,
          creatorId: creatorDb.id,
          saleMadeBy: affiliateDb.id,
          productId: productDb.id,
          type: transaction.type,
          userId,
        });
        break;
      }

      case AFFILIATE_COMISSION: {
        const productDb = await getProductDb(transaction);
        const affiliateDb = await TRANSACTIONS_METHODS.createOrFindAffiliate({
          name: transaction.seller,
        });
        await TRANSACTIONS_METHODS.createTransaction({
          date: new Date(transaction.date),
          value: transaction.value,
          affiliateId: +affiliateDb.id,
          productId: +productDb.id,
          saleMadeBy: +affiliateDb.id,
          type: transaction.type,
          userId,
        });
        break;
      }

      case PRODUCT_COMISSION: {
        const creatorDb = await TRANSACTIONS_METHODS.createOrFindCreator({
          name: transaction.seller,
        });
        const product = await TRANSACTIONS_METHODS.saveProductIfDontExists({
          name: transaction.product,
          creatorId: creatorDb.id,
        });
        await TRANSACTIONS_METHODS.createTransaction({
          date: new Date(transaction.date),
          creatorId: creatorDb.id,
          productId: product.id,
          type: transaction.type,
          userId,
          value: -transaction.value,
        });
        break;
      }
    }
  }
};
