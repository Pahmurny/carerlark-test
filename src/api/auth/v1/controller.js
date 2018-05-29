import { sign } from '../../../services/jwt';

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => {
      return res.status(200).json({ token, user });
    })
    .catch(next);

export default {
  login,
};
