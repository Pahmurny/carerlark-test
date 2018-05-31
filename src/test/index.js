
import db from '../db/models';
import { sign } from '../services/jwt';

import testData from './store';

export const generateTestData = () => {
  return new Promise(async (resolve, reject) => {
    let company1;
    let company2;
    let user1;
    let user2;
    let admin;
    let request1;
    let request2;
    let feedback1;
    let feedback2;
    let feedback3;
    try {
      company1 = await db.Company.create(testData.company1);
      company2 = await db.Company.create(testData.company2);
      user1 = await db.User.create({ ...testData.user1, company_id: company1.dataValues.id });
      user1.token = await sign(user1.dataValues.id);
      user2 = await db.User.create({ ...testData.user2, company_id: company2.dataValues.id });
      user2.token = await sign(user2.dataValues.id);
      admin = await db.User.create(testData.userAdmin);
      admin.token = await sign(admin.dataValues.id);
      request1 = await db.FeedbackRequest.create({
        ...testData.request1,
        person_about: user1.dataValues.id,
        givers: [user1.dataValues.id, user2.dataValues.id],
        requester_id: user2.dataValues.id,
      });
      request2 = await db.FeedbackRequest.create({
        ...testData.request2,
        person_about: user1.dataValues.id,
        givers: [user1.dataValues.id, user2.dataValues.id],
        requester_id: user2.dataValues.id,
      });
      feedback1 = await db.Feedback.create({
        ...testData.feedback1,
        requester_id: user2.dataValues.id,
        person_about: user1.dataValues.id,
        giver_id: user1.dataValues.id,
        receiver_id: user2.dataValues.id,
        request_id: request1.dataValues.id,
      });
      feedback2 = await db.Feedback.create({
        ...testData.feedback2,
        requester_id: user2.dataValues.id,
        person_about: user1.dataValues.id,
        giver_id: user1.dataValues.id,
        receiver_id: user2.dataValues.id,
        request_id: request1.dataValues.id,
      });
      feedback3 = await db.Feedback.create({
        ...testData.feedback3,
        requester_id: user2.dataValues.id,
        person_about: user1.dataValues.id,
        giver_id: user1.dataValues.id,
        receiver_id: user2.dataValues.id,
        request_id: request1.dataValues.id,
      });
      const response = {
        company1,
        company2,
        user1,
        user2,
        admin,
        request1,
        request2,
        feedback1,
        feedback2,
        feedback3,
      };
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  generateTestData,
};
