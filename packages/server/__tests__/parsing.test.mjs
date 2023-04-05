import { parseFileContent } from '../utils.mjs';

describe('parseFileContent', () => {
  it('should throw an error if parameter is not a string', () => {
    expect(() => {
      parseFileContent(null);
    }).toThrow('O parâmetro deve ser uma string');
  });

  it('should throw an error if the file is empty', () => {
    expect(() => {
      parseFileContent('');
    }).toThrow('O arquivo está vazio');
  });

  it('should throw an error if the type value is not valid', () => {
    const fileContent =
      '02022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS';
    expect(() => {
      parseFileContent(fileContent);
    }).toThrow('O valor do tipo na linha 1 não é válido');
  });

  it('should throw an error if the date is not valid', () => {
    const fileContent =
      '32022-01*16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA';
    expect(() => {
      parseFileContent(fileContent);
    }).toThrow('A data na linha 1 não é válida');
  });
});
