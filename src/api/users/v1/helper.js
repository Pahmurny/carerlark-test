export const getFeedbakType = (type, id) => {
  let typeFilter = [];
  switch (type) {
    case 'given':
      typeFilter = [
        {
          giver_id: id,
        },
      ];
      break;
    case 'received':
      typeFilter = [
        {
          receiver_id: id,
        },
      ];
      break;
    case 'about':
      typeFilter = [
        {
          person_about_id: id,
        },
      ];
      break;
    case 'all':
      typeFilter = [
        {
          giver_id: id,
        },
        {
          receiver_id: id,
        },
        {
          person_about_id: id,
        },
      ];
      break;
    default:
      typeFilter = [
        {
          giver_id: id,
        },
        {
          receiver_id: id,
        },
        {
          person_about_id: id,
        },
      ];
      break;
  }
  return typeFilter;
};

export const stringToBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
    case 'true': case 'yes': case '1': return true;
    case 'false': case 'no': case '0': case null: return false;
    default: return false;
  }
};

export const getStartEndDates = (start, end) => {
  // TODO: move to helper, add validations, check how it works with timezones etc
  let startFormated = new Date(1);
  let endFormated = new Date(2200, 1, 1);

  if (start) {
    startFormated = new Date(start);
  }
  if (end) {
    endFormated = new Date(end);
  }
  return [startFormated, endFormated];
};

export default {
  getFeedbakType,
  stringToBoolean,
  getStartEndDates,
};
