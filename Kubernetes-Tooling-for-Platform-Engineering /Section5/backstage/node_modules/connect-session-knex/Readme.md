# Connect Session Knex


[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![NPM][npm-image]][npm-url]

connect-session-knex is an [express-session](https://github.com/expressjs/session) store backed by PostgreSQL, MySQL, MariaDB, MSSQL, Oracle or SQLite3, via the [knex.js](http://knexjs.org/) library.

## Installation

```sh
$ npm install connect-session-knex
```

## History

See [Changelog.md](Changelog.md)

## Usage

[Example application using the defaults](https://github.com/gx0r/connect-session-knex/blob/master/examples/example.js)

[Example application with PostgreSQL](https://github.com/gx0r/connect-session-knex/blob/master/examples/example-postgres.js)

[With Express 3 or Connect](https://github.com/gx0r/connect-session-knex/blob/master/Oldversions.md)

## Options

 - `tablename='sessions'` Tablename to use. Defaults to 'sessions'.
 - `sidfieldname='sid'` Field name in table to use for storing session ids. Defaults to 'sid'.
 - `knex` knex instance to use. Defaults to a new knex instance, using sqlite3 with a file named 'connect-session-knex.sqlite'
 - `createtable` if the table for sessions should be created automatically or not.
 - `clearInterval` milliseconds between clearing expired sessions. Defaults to 60000.
 - `disableDbCleanup` disables the automatic clearing of expired sessions. Defaults to false. 

If the table does not exist in the schema, this module will attempt to create it unless the 'createtable' option is false.

If a knex instance is not provided, this module will attempt to create a sqlite3 database, with a file named 'connect-session-knex.sqlite', in the working directory of the process.

## Schema

### PostgreSQL or SQLite

#### Table Name "sessions"  
| Column  |           Type           | Modifiers | Storage  | 
|---------|:------------------------:|:---------:|:--------:|
| sid     | character varying(255)   | not null  | extended |
| sess    | json                     | not null  | extended |
| expired | timestamp with time zone | not null  | plain    |  

### Indexes:
```  
    "sessions_pkey" PRIMARY KEY, btree (sid)  
    "sessions_expired_index" btree (expired)
```

### MySQL

Table Name `sessions`.

| Column  |           Type           |   Modifiers  |
|---------|:------------------------:|:------------:|
| sid     | VARCHAR(255)             | NOT NULL, PK |
| sess    | JSON                     | NOT NULL     |
| expired | DATETIME                 | NOT NULL     |

Command to manually create table:

```sql
CREATE TABLE `sessions` (
  `sid` VARCHAR(255) NOT NULL,
  `sess` JSON NOT NULL,
  `expired` DATETIME NOT NULL,
  PRIMARY KEY (`sid`));
```  

## Benchmarks

[https://github.com/gx0r/express-session-benchmarks](https://github.com/gx0r/express-session-benchmarks)

[npm-version-image]: https://img.shields.io/npm/v/connect-session-knex.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/connect-session-knex.svg
[npm-image]: https://nodei.co/npm/connect-session-knex.png?downloads=true&downloadRank=true&stars=true
[npm-url]: https://npmjs.org/package/connect-session-knex
[travis-image]: https://img.shields.io/travis/gx0r/connect-session-knex/master.svg
[travis-url]: https://travis-ci.org/gx0r/connect-session-knex
[node-image]: https://img.shields.io/node/v/connect-session-knex.svg
[node-url]: http://nodejs.org/download/

## Testing

Install Postgresql

Instructions for Ubuntu after intalling the db:

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE travis_ci_test OWNER postgres;
```

```sql
GRANT all privileges ON DATABASE travis_ci_test TO postgres;
```

```sql
ALTER USER postgres WITH PASSWORD 'postgres';
```

```sql
\q
```

Install Mysql

Instructions for Ubuntu after installing the db:

```bash
sudo mysql -u root
```

```sql
create user 'travis' identified by 'travis';
```

```sql
ALTER USER 'travis'@'localhost' IDENTIFIED BY 'travis';
```

```sql
create database travis_ci_test;
```

```sql
grant all on travis_ci_test.* to 'travis';
```

```sql
\q
```

```bash
sudo service mysql restart
```

Make sure both the MySQL and Postgres services are running

```bash
npm run test
```
