import db from '../../../db/models';

export const getNoteById = ({ user, params, query }, res, next) => {
  res.status(200).json({ message: 'geting notes by id', params, query });
};

export const getNotes = ({ user, params, query }, res, next) => {
  res.status(200).json({ message: 'geting list of notes', params, query });
};

export default {
  getNoteById,
  getNotes,
};
