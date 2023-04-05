import fs from 'fs';
import { parseFileContent } from '../utils.mjs';
import { saveTransactions } from './TranscationController.mjs';

export const handleUploads = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const fileContent = fs.readFileSync(req.file.path, 'utf-8');
    const parsedFile = parseFileContent(fileContent);
    await saveTransactions({ transactions: parsedFile, userId });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
