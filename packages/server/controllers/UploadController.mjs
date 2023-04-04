import fs from "fs";
import { parseFileContent, saveTransactions } from "../utils.mjs";

export const handleUploads = async (req, res) => {
  try {
    const fileContent = fs.readFileSync(req.file.path, "utf-8");
    const parsedFile = parseFileContent(fileContent);
    await saveTransactions(parsedFile);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};
