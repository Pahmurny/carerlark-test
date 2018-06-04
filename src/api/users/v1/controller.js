import { Op } from 'sequelize';
import { sign } from '../../../services/jwt';
import db from '../../../db/models';
import { generateError, getPagination } from '../../../services/helper';
import { getFeedbakType, stringToBoolean, getStartEndDates } from './helper';

export const showMe = ({ user }, res, next) => {
  return db.User.findOne({
    where: {
      id: user.id,
    },
    include: [
      {
        model: db.Company,
        as: 'company',
      },
    ],
  })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const create = ({ body: { name, password, email } }, res, next) => {
  let user;
  return db.User.create({ name, password, email })
    .then((userData) => {
      user = userData;
      return sign(user.id);
    })
    .then((token) => {
      return res.status(201).json({ token, user: user.view() });
    })
    .catch(error => next(error));
};

export const getFeedbacks = ({ params, query }, res, next) => {
  // if (parseInt(params.id, 10) !== user.id) {
  //   return next(generateError('You can\'t get feedbacks for this user', 403));
  // }
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    [Op.and]: [
      {
        [Op.or]: getFeedbakType(query.type, params.id),
      },
    ],
  };
  if (query.is_private) {
    whereFilter[Op.and].push({
      is_private: stringToBoolean(query.is_private),
    });
  }
  if (query.start || query.end) {
    whereFilter[Op.and].push({
      created: {
        [Op.between]: getStartEndDates(query.start, query.end),
      },
    });
  }
  return db.Feedback.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch(error => next(error));
};

export const getDetails = ({ params }, res, next) => {
  return db.User.findById(parseInt(params.id, 10) || 0, {
    include: [
      {
        model: db.Company,
        as: 'company',
      },
    ],
  })
    .then((userData) => {
      if (!userData) {
        return res.status(404).json();
      }
      return res.status(200).json(userData);
    })
    .catch(error => next(error));
};

export const getRequests = ({ params, query }, res, next) => {
  // if (parseInt(params.id, 10) !== user.id) {
  //   return next(generateError('You can\'t get requests for this user', 403));
  // }
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    [Op.or]: [
      {
        requester_id: params.id,
      },
      {
        person_about_id: params.id,
      },
    ],
  };
  return db.FeedbackRequest.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch(error => next(error));
};

export const createRequest = ({ user, params, body }, res, next) => {
  if (parseInt(params.id, 10) !== user.id) {
    return next(generateError('You can\'t create request for this user', 403));
  }
  const feedbackRequest = {
    qusetion_type_enum: body.question_type || 'general',
    is_anonymous: body.is_anonymous || false,
    question: body.question || '',
    send_to_type_enum: body.send_to_type || 'employee',
    person_about_id: body.person_about,
    requester_id: params.id,
  };
  const giversArray = Array.isArray(body.givers) ? body.givers : [];
  feedbackRequest.request_givers = giversArray.map((element) => {
    return {
      is_finished: false,
      giver_id: element,
    };
  });

  return db.FeedbackRequest.create(feedbackRequest, {
    include: {
      model: db.RequestGiver,
      as: 'request_givers',
    },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(error => next(error));
};

export const getReveiws = ({ params, query }, res, next) => {
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    [Op.or]: [
      {
        reviewer_id: params.id,
      },
      {
        person_about_id: params.id,
      },
    ],
  };
  return db.Review.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch(error => next(error));
};


export const getAllUsers = ({ query }, res, next) => {
  const { limit, offset } = getPagination(query);
  const whereFilter = {
    [Op.and]: [],
  };
  if (parseInt(query.company_id, 10)) {
    whereFilter[Op.and].push({
      company_id: parseInt(query.company_id, 10),
    });
  }
  if (query.is_deleted) {
    whereFilter[Op.and].push({
      is_deleted: stringToBoolean(query.is_deleted),
    });
  }
  if (query.start || query.end) {
    whereFilter[Op.and].push({
      created: {
        [Op.between]: getStartEndDates(query.start, query.end),
      },
    });
  }
  return db.User.findAndCountAll({
    where: whereFilter,
    limit,
    offset,
  })
    .then((usersData) => {
      return res.status(200).json(usersData);
    })
    .catch(error => next(error));
};

export default {
  showMe,
  create,
  getDetails,
  getFeedbacks,
  getRequests,
  createRequest,
  getReveiws,
  getAllUsers,
};
