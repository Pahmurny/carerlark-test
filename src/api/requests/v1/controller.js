import { Op } from 'sequelize';
import db from '../../../db/models';
import { errorPromise, getPagination } from '../../../services/helper';

export const getRequestFeedbacks = ({ params, query }, res, next) => {
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    request_id: params.id,
  };
  return db.Feedback.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const createRequestFeedback = ({ user, params, body }, res, next) => {
  return db.FeedbackRequest.findById(params.id)
    .then((feedbackRequestResponse) => {
      if (!feedbackRequestResponse) {
        return errorPromise('No such feedback request!', 404);
      }
      const { dataValues: feedbackRequest } = feedbackRequestResponse;
      const feedback = {
        comment: body.comment,
        giver_id: user.id,
        person_about_id: feedbackRequest.person_about_id,
        request_id: feedbackRequest.id,
        requester_id: feedbackRequest.requester_id,
        question: feedbackRequest.question,
      };
      return db.Feedback.create(feedback);
    })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const getPendingRequestGivers = ({ params, query }, res, next) => {
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    request_id: params.id,
    is_finished: false,
  };
  return db.RequestGiver.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const getRequestDetails = ({ params }, res, next) => {
  return db.FeedbackRequest.findById(parseInt(params.id, 10) || 0, {
    include: [
      {
        model: db.User,
        as: 'requester',
      },
      {
        model: db.User,
        as: 'person_about',
      },
    ],
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const getRequestsList = ({ query }, res, next) => {
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    [Op.and]: [],
  };
  return db.FeedbackRequest.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export default {
  getRequestFeedbacks,
  createRequestFeedback,
  getPendingRequestGivers,
  getRequestDetails,
  getRequestsList,
};
