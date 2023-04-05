export const parseFileContent = (fileContent) => {
  // check if is string
  if (typeof fileContent !== 'string') {
    throw new Error('O parâmetro deve ser uma string');
  }

  const rows = fileContent.split('\n');
  const data = [];

  // Verificar se o arquivo está vazio
  if (!fileContent.trim()) {
    throw new Error('O arquivo está vazio');
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].trim();

    if (!row) {
      continue;
    }

    const type = parseInt(row.substring(0, 1), 10);

    // Check if type is correct
    if (isNaN(type) || type < 1 || type > 4) {
      throw new Error(`O valor do tipo na linha ${i + 1} não é válido`);
    }

    const date = new Date(`${row.substring(1, 26)}`);
    // check if date is correct
    if (!date.getTime()) {
      throw new Error(`A data na linha ${i + 1} não é válida`);
    }

    const product = row.substring(26, 56).trim();
    const value = parseInt(row.substring(56, 66), 10);

    // check if value is interger
    if (isNaN(value) || !Number.isInteger(value)) {
      throw new Error(`O valor na linha ${i + 1} não é um número inteiro`);
    }

    const seller = row.substring(66, 86).trim();

    // check if productor and affiliate are empty
    if (!product || !seller) {
      throw new Error(
        `O nome do produto ou afiliado na linha ${i + 1} está vazio`,
      );
    }

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
