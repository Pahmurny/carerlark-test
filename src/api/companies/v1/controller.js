import db from '../../../db/models';

export const create = ({ body, user }, res, next) => {
  db.Company.create(body)
    .then((response) => {
      res.status(200).json({ message: 'created', company: response });
    })
    .catch((error) => {
      next(error);
    });
};

export default {
  create,
};
