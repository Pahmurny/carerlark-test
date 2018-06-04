# Basic express + postgres server template

## Prerequisites

* Node v10+

## Installation

Dependencies:

```
$ npm install
```
Settings:

Copy and remane '.env.example' file in the root of projec to '.env'

Add following settings:

```
API_ROOT="/api/"
JWT_SECRET=jkdnsvkljbdfskvbdfksbvdhfjbvhldfsb
DEBUG=api:*
NODE_ENV=development

DB_NAME_TEST='testDb'
DB_USER_TEST='postgres'
DB_PASS_TEST='postgres'
DB_HOST_TEST='localhost'

DB_NAME_DEV=YOUR_DB_NAME
DB_USER_DEV=YOUR_DB_USERNAME
DB_PASS_DEV=YOUR_DB_PASSWORD
DB_HOST_DEV=YOUR_DB_HOST

DB_NAME_PROD='devDb'
DB_USER_PROD='postgres'
DB_PASS_PROD='postgres'
DB_HOST_PROD='localhost'

```

## Usage

Start the application:

```bash
$ npm start
```
