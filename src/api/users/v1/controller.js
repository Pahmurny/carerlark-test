import { Op } from 'sequelize';
import { sign } from '../../../services/jwt';
import db from '../../../db/models';
import { generateError } from '../../../services/helper';
import { getFeedbakType, stringToBoolean, getStartEndDates } from './helper';

export const showMe = ({ user }, res, next) => {
  // const userInfo = user.view();
  // if (userInfo.is_admin) userInfo = { ...userInfo, is_admin: undefined };
  return db.User.findOne({
    where: {
      id: user.id,
    },
    attributes: {
      exclude: ['password', 'created', 'updated'],
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
    .catch((error) => {
      next(error);
    });
};

export const create = ({ body: { name, password, email } }, res, next) => {
  console.log('Creating user', name, password, email);
  let user;
  return db.User.create({ name, password, email })
    .then((userData) => {
      console.log('User created!');
      user = userData;
      return sign(user.id);
    })
    .then((token) => {
      return res.status(201).json({ token: token, user: user.view() });
    })
    .catch(error => next(error));
};

export const getFeedbacks = ({ user, params, query }, res, next) => {
  if (parseInt(params.id, 10) !== user.id) {
    return next(generateError('You can\'t get feedbacks for this user', 403));
  }
  const limit = Number.isNaN(parseInt(query.limit, 10)) ? 20 : parseInt(query.limit, 10); // TODO: add validation < 100
  const offset = Number.isNaN(parseInt(query.offset, 10)) ? 0 : parseInt(query.offset, 10);
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
    limit: limit,
    offset: offset,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
};

export const getDetails = ({ user, params }, res, next) => {
  res.status(200).json({ message: 'geting user details', params, query });
};

export const getRequests = ({ user, params, query }, res, next) => {
  if (parseInt(params.id, 10) !== user.id) {
    return next(generateError('You can\'t get requests for this user', 403));
  }
  const limit = Number.isNaN(parseInt(query.limit, 10)) ? 20 : parseInt(query.limit, 10); // TODO: add validation < 100
  const offset = Number.isNaN(parseInt(query.offset, 10)) ? 0 : parseInt(query.offset, 10);
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
    limit: limit,
    offset: offset,
  })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      next(error);
    });
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
    .catch((error) => {
      next(error);
    });
};

export default {
  showMe,
  create,
  getFeedbacks,
  createRequest,
  getDetails,
};
