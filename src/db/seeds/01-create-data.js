
import db from '../models';

let user1 = {
  name: 'test-user',
  job_title: 'Test user',
  first_name: 'John',
  last_name: 'Doe',
  real_name: 'Hunson Abadeer',
  email: 's.pahmurny@gmail.com',
  skype: 'skype:hunson',
  phone: '+123654789',
  title: 'Lord',
  is_admin: false,
  tz: 'America/Anchorage',
  password: '123456',
};
let userAdmin = {
  name: 'test-admin',
  job_title: 'Test Admin',
  first_name: 'John',
  last_name: 'Cena',
  real_name: 'John Cena',
  email: 's.pahmurny@gmail.com',
  skype: 'skype:cena',
  phone: '+987456321',
  title: 'Champion',
  is_admin: true,
  tz: 'America/Anchorage',
  password: '123456',
};

let company1 = {
  name: 'TestCo',
  domain_name: 'domain-testco',
  email_domain: 'email-testco',
  status: 4,
  tz: 'America/Anchorage',
};

let feedback1 = {
  comment: 'this is feedback 1',
  question: 'What is this? 1',
};
let feedback2 = {
  comment: 'this is feedback 2',
  question: 'What is this? 2',
};
let feedback3 = {
  comment: 'this is feedback 3',
  question: 'What is this? 4',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    company1 = await db.Company.create(company1);
    user1.company_id = company1.id;
    userAdmin.company_id = company1.id;
    user1 = await db.User.create(user1);
    userAdmin = await db.User.create(userAdmin);

    feedback1.giver_id = userAdmin.id;
    feedback1.receiver_id = user1.id;
    feedback1 = await db.Feedback.create(feedback1);

    feedback2.giver_id = userAdmin.id;
    feedback2.receiver_id = user1.id;
    feedback2 = await db.Feedback.create(feedback2);

    feedback3.giver_id = userAdmin.id;
    feedback3.receiver_id = user1.id;
    feedback3 = await db.Feedback.create(feedback3);
  },

  down: async (queryInterface, Sequelize) => {
    await db.User.destroy({ truncate: true, cascade: true });
    await db.Company.destroy({ truncate: true, cascade: true });
  },
};
