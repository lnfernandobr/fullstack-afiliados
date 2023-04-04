import { sequelize, Transaction } from '../models/index.mjs';
import { Op } from 'sequelize';

export const handleTransactions = async (req, res) => {
  try {
    const { page } = req.query;
    const { userId } = req.user;
    const limit = 10;
    const offset = (page - 1) * limit;

    const transactions = await Transaction.findAndCountAll({
      limit,
      offset,
      attributes: [
        'product',
        'seller',
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              `CASE WHEN type = 1 or type = 2 THEN amount ELSE -amount END`,
            ),
          ),
          'amount',
        ],
      ],
      group: ['seller', 'product'],
      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
    });

    const totalPages = Math.ceil(transactions.count / limit);

    res.json({
      transactions: transactions.rows,
      totalPages,
    });
  } catch (err) {
    res.status(500).send('Error fetching transactions');
  }
};
