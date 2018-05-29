import db from '../../../db/models';

export const getFeedbackById = ({ user, params, query }, res, next) => {
  res.status(200).json({ message: 'geting feedback by id', params, query });
};

export const patchFeedbackById = ({ user, params, query }, res, next) => {
  res.status(200).json({ message: 'patching feedback by id', params, query });
};

export default {
  getFeedbackById,
  patchFeedbackById,
};
