export const generateUpdateFileds = (body = [], allowedFiled = []) => {
  if (!Array.isArray(body)) {
    return {};
  }
  return body.reduce((acc, cur) => {
    if (allowedFiled.includes(cur.path)) {
      acc[cur.path] = cur.value;
    }
    return acc;
  }, {});
};

export default {
  generateUpdateFileds,
};
