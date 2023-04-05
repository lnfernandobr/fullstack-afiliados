const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  testMatch: ['**/*.test.mjs'],
  moduleFileExtensions: ['js', 'mjs'], // Adiciona a extensão .mjs na lista de extensões de módulo do Jest
  transform: {}, // Adicione qualquer configuração adicional de transformação de código
};
