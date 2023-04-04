import fs from 'fs';
import { parseFileContent, saveTransactions } from '../utils.mjs';

export const handleUploads = async (req, res) => {
  try {
    const { userId } = req.user;
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const parsedFile = parseFileContent(fileContent);
    await saveTransactions({ transactions: parsedFile, userId });
    res.sendStatus(200);
  } catch (error) {
    // TODO handle it
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
