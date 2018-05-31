import db from '../../../db/models';
import { generateUpdateFileds } from './helper';

export const getFeedbackById = ({ params, query }, res, next) => {
  // What shoud we do with anonymous feedbacks? remove giver?
  return db.Feedback.findById(parseInt(params.id, 10), {
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

export const patchFeedbackById = async ({ params, body }, res, next) => {
  try {
    const Feedback = await db.Feedback.findById(parseInt(params.id, 10));
    if (!Feedback) {
      return res.status(404).json();
    } else {
      const updatedFeedback = await Feedback.update(generateUpdateFileds(body, ['comment', 'is_anonymous']));
      return res.status(200).json(updatedFeedback);
    }
  } catch (error) {
    return next(error);
  }
};

export default {
  getFeedbackById,
  patchFeedbackById,
};
