export const generateError = (message, code) => {
  const error = new Error(message || 'Unknown error');
  error.code = code || 400;
  error.status = code || 400;
  return error;
};

export const errorPromise = (message, code) => {
  return Promise.reject(generateError(message, code));
};

export default {
  errorPromise,
  generateError,
};
