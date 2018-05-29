CREATE TABLE "user" (
  id serial NOT NULL PRIMARY KEY,
  updated timestamp NULL,
  created timestamp NULL,
  company_id integer NULL,
  name varchar(128) NOT NULL UNIQUE,
  slack_id varchar(16) NULL,
  deleted bool NULL DEFAULT false,
  job_title varchar(256) NULL,
  first_name varchar(256) NULL,
  last_name varchar(256) NULL,
  real_name varchar(1024) NULL,
  email varchar(320) NULL,
  skype varchar(128) NULL,
  phone varchar(128) NULL,
  title varchar(128) NULL,
  is_admin bool NULL DEFAULT false,
  image_24 varchar(2048) NULL,
  image_32 varchar(2048) NULL,
  image_48 varchar(2048) NULL,
  image_72 varchar(2048) NULL,
  image_192 varchar(2048) NULL,
  tz varchar(128) NULL,
  is_install_user bool NULL DEFAULT false,
  password varchar(100)
);
CREATE TABLE "company" (
  id serial NOT NULL PRIMARY KEY,
  updated timestamp NULL,
  created timestamp NULL,
  team_id integer NULL,
  name varchar(256) NOT NULL,
  domain_name varchar(256) NULL,
  email_domain varchar(512) NULL,
  status smallint NULL,
  tz varchar(128) NULL
);
CREATE TABLE "feedback" (
  id serial NOT NULL PRIMARY KEY,
  updated timestamp NULL,
  created timestamp NULL,
  comment varchar(3000) NULL,
  is_anonymous bool NULL DEFAULT false,
  is_private bool NULL DEFAULT false,
  employee_acknowledgment varchar(3000) NULL,
  manager_acknowledgment varchar(3000) NULL,
  delivered timestamp NULL,
  qusetion_type_enum varchar(100) NULL,
  question varchar(124) NULL,
  requester_id integer NULL,
  giver_id integer NULL,
  receiver_id integer NULL,
  person_about_id integer NULL,
  request_id integer NULL
);

CREATE TABLE "feedback_request" (
  id serial NOT NULL PRIMARY KEY,
  updated timestamp NULL,
  created timestamp NULL,
  qusetion_type_enum varchar(100) NULL,
  question varchar(124) NULL,
  send_to_type_enum varchar(100) NULL,
  is_unsolicited bool NULL DEFAULT false,
  is_anonymous bool NULL DEFAULT false,
  is_completed bool NULL DEFAULT false,
  expires timestamp NULL,
  requester_id integer NULL,
  person_about_id integer NULL
);

CREATE TABLE "request_giver" (
  id serial NOT NULL PRIMARY KEY,
  updated timestamp NULL,
  created timestamp NULL,
  is_finished bool NULL DEFAULT false,
  request_id integer NULL,
  giver_id integer NULL
);
