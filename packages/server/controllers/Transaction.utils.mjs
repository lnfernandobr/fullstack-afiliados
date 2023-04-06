import { Affiliate, Creator, Product, Transaction } from '../models/index.mjs';
import { Op } from 'sequelize';

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

const createTransaction = async (transcation) => {
  // if transcation was already synced we'll find it in database.
  const transactionDb = await Transaction.findOne({
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

  if (transactionDb) {
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

export const TRANSACTIONS_METHODS = {
  saveProductIfDontExists,
  createTransaction,
  createOrFindAffiliate,
  createOrFindCreator,
};
