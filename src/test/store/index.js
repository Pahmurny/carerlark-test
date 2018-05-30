const company1 = {
  name: 'TestCo-1',
  domain_name: 'domain-testco',
  email_domain: 'email-testco',
  status: 4,
  tz: 'America/Anchorage',
};

const company2 = {
  name: 'TestCo-2',
  domain_name: 'domain-testco-2',
  email_domain: 'email-testco-2',
  status: 3,
  tz: 'America/Anchorage',
};

const user1 = {
  name: 'test-user-1',
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

const user2 = {
  name: 'test-user-2',
  job_title: 'Test user 2',
  first_name: 'Jonh',
  last_name: 'Rambo',
  real_name: 'Silvester Stalone',
  email: 's.pahmurny@gmail.com',
  skype: 'skype:rambo',
  phone: '+123654789',
  title: 'Mr.',
  is_admin: false,
  tz: 'America/Anchorage',
  password: '123456',
};

const userAdmin = {
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

const request1 = {
  question: 'Question for request 1',
  question_type: 'writein',
  send_to_type: 'manager',
};

const request2 = {
  question: 'Question for request 2',
  question_type: 'writein',
  send_to_type: 'manager',
};

const feedback1 = {
  comment: 'this is feedback 1',
  question: 'What is this? 1',
};
const feedback2 = {
  comment: 'this is feedback 2',
  question: 'What is this? 2',
};
const feedback3 = {
  comment: 'this is feedback 3',
  question: 'What is this? 4',
};

export default {
  company1,
  company2,
  user1,
  user2,
  request1,
  request2,
  userAdmin,
  feedback1,
  feedback2,
  feedback3,
};
