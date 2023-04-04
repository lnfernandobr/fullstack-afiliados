import { sequelize, Transaction } from "./models/index.mjs";

export const parseFileContent = (fileContent) => {
  const rows = fileContent.split("\n");
  const data = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].trim();

    if (!row) {
      continue;
    }

    const type = parseInt(row.substring(0, 1), 10);
    const date = new Date(`${row.substring(1, 26)}`);
    const product = row.substring(26, 56).trim();
    const value = parseInt(row.substring(56, 66), 10);
    const seller = row.substring(66, 86).trim();

    data.push({
      type,
      date,
      product,
      value,
      seller,
    });
  }

  return data;
};

export const saveTransactions = async ({ transactions, userId }) => {
  try {
    await sequelize.sync({ force: true });
    for (const transaction of transactions) {
      const { type, date, product, value, seller } = transaction;
      await Transaction.create({
        type,
        date,
        product,
        amount: value,
        seller,
        userId,
      });
    }

    console.log("Transactions saved successfully!");
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
};
