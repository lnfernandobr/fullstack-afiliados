import {
  Affiliate,
  Creator,
  Product,
  sequelize,
  Transaction,
} from '../models/index.mjs';
import { Op } from 'sequelize';

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

const createOrFindCreator = async ({ name }) => {
  const creator = await Creator.findOne({
    where: {
      name: {
        [Op.eq]: name,
      },
    },
  });

  if (creator) {
    return creator;
  }

  return Creator.create({ name });
};
const createOrFindAffiliate = async ({ name }) => {
  const affiliate = await Affiliate.findOne({
    where: {
      name: {
        [Op.eq]: name,
      },
    },
  });

  if (affiliate) {
    return affiliate;
  }

  return Affiliate.create({ name });
};

export const createTranscation = async (transcation) => {
  // if transcation was already synced we'll find it in database.
  const transcationDb = await Transaction.findOne({
    where: {
      type: {
        [Op.eq]: transcation.type,
      },
      date: {
        [Op.eq]: transcation.date,
      },
      productId: {
        [Op.eq]: transcation.productId,
      },
      userId: {
        [Op.eq]: transcation.userId,
      },
      ...(transcation.affiliateId
        ? {
            affiliateId: {
              [Op.eq]: transcation.affiliateId,
            },
          }
        : {}),
      ...(transcation.creatorId
        ? {
            creatorId: {
              [Op.eq]: transcation.creatorId,
            },
          }
        : {}),
    },
  });

  if (transcationDb) {
    // eslint-disable-next-line no-console
    console.warn('This transaction was already synced');
    return null;
  }

  return Transaction.create(transcation);
};

const saveProductIfDontExists = async ({ name, creatorId }) => {
  const productDb = await Product.findOne({
    where: {
      name: {
        [Op.eq]: name,
      },
    },
  });

  if (productDb) {
    return productDb;
  }

  return Product.create({ name, creatorId });
};

export const saveTransactions = async ({ transactions, userId }) => {
  for (const transaction of transactions) {
    const PRODUCTOR_SALE = 1;
    const AFFILIATE_SALE = 2;
    const AFFILIATE_COMISSION = 3;
    const PRODUCT_COMISSION = 4;

    if (
      transaction.type === PRODUCTOR_SALE ||
      transaction.type === PRODUCT_COMISSION
    ) {
      const creatorDb = await createOrFindCreator({ name: transaction.seller });
      const product = await saveProductIfDontExists({
        name: transaction.product,
        creatorId: creatorDb.id,
      });

      const { value } = transaction;
      const tr = {
        date: new Date(transaction.date),
        creatorId: creatorDb.id,
        productId: product.id,
        type: transaction.type,
        userId,
        value: transaction.type === PRODUCT_COMISSION ? -value : value,
      };

      await createTranscation(tr);
      continue;
    }

    const productDb = await Product.findOne({
      where: { name: transaction.product },
    });

    if (transaction.type === AFFILIATE_SALE) {
      const affiliateDb = await createOrFindAffiliate({
        name: transaction.seller,
      });

      const creatorDb = await Creator.findOne({
        where: { id: productDb.creatorId },
      });

      await createTranscation({
        date: new Date(transaction.date),
        value: transaction.value,
        creatorId: creatorDb.id,
        saleMadeBy: affiliateDb.id,
        productId: productDb.id,
        type: transaction.type,
        userId,
      });
      continue;
    }

    if (transaction.type === AFFILIATE_COMISSION) {
      const affiliateDb = await createOrFindAffiliate({
        name: transaction.seller,
      });

      await createTranscation({
        date: new Date(transaction.date),
        value: transaction.value,
        affiliateId: +affiliateDb.id,
        productId: +productDb.id,
        saleMadeBy: +affiliateDb.id,
        type: transaction.type,
        userId,
      });
    }
  }
};
