import db from '../../../db/models';

export const create = ({ body, user }, res, next) => {
  console.log('Creating company', body, user.view());
  db.Company.create(body)
    .then((response) => {
      res.status(200).json({ message: 'created', company: response });
    })
    .catch((error) => {
      next(error);
    });

  // let user;
  // return db.User.create({ name, password, email })
  //   .then((userData) => {
  //     console.log('User created!');
  //     user = userData;
  //     return sign(user.id);
  //   })
  //   .then((token) => {
  //     return res.status(201).json({ token: token, user: user.view() });
  //   })
  //   .catch(error => next(error));
};

export default {
  create,
};
