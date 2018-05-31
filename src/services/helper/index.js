export const generateError = (message = 'Unknown error', code = 400) => {
  const error = new Error(message);
  error.code = code;
  error.status = code;
  return error;
};

export const errorPromise = (message, code) => {
  return Promise.reject(generateError(message, code));
};

export const getPagination = ({ limit, offset }) => {
  const limitResult = Number.isNaN(parseInt(limit, 10)) ? 20 : parseInt(limit, 10); // TODO: add validation < 100
  const offsetResult = Number.isNaN(parseInt(offset, 10)) ? 0 : parseInt(offset, 10);
  return { limit: limitResult, offset: offsetResult };
};

export default {
  errorPromise,
  generateError,
  getPagination,
};
