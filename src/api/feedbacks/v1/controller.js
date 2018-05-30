import db from '../../../db/models';

export const getFeedbackById = ({ params, query }, res, next) => {
  // What shoud we do with anonymous feedbacks? remove giver?
  return db.Feedback.findById(parseInt(params.id, 10), {
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: db.FeedbackRequest,
        as: 'request',
      },
      {
        model: db.User,
        as: 'requester',
      },
      {
        model: db.User,
        as: 'giver',
      },
      {
        model: db.User,
        as: 'receiver',
      },
      {
        model: db.User,
        as: 'person_about',
      },
    ],
  })
    .then((usersData) => {
      return res.status(200).json(usersData);
    })
    .catch(error => next(error));
};

export const patchFeedbackById = ({ user, params, query }, res, next) => {
  res.status(200).json({ message: 'patching feedback by id', params, query });
};

export default {
  getFeedbackById,
  patchFeedbackById,
};
