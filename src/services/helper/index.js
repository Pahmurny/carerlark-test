export const generateError = (message = 'Unknown error', code = 400) => {
  const error = new Error(message);
  error.code = code;
  error.status = code;
  return error;
};

export const errorPromise = (message, code) => {
  return Promise.reject(generateError(message, code));
};

export default {
  errorPromise,
  generateError,
};
