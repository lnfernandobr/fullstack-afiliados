export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  res.status(status).json({ error: message });
};
