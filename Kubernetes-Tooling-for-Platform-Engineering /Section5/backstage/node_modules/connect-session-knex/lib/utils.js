/*
   * Returns true if the specified knex instance is using sqlite3.
   * @return {bool}
   * @api private
   */
function isSqlite3(knex) {
  return knex.client.dialect === 'sqlite3';
}

/*
     * Returns true if the specified knex instance is using mysql.
     * @return {bool}
     * @api private
     */
function isMySQL(knex) {
  return ['mysql', 'mariasql', 'mariadb'].indexOf(knex.client.dialect) > -1;
}

/*
     * Returns true if the specified knex instance is using mssql.
     * @return {bool}
     * @api private
     */
function isMSSQL(knex) {
  return ['mssql'].indexOf(knex.client.dialect) > -1;
}

/*
     * Returns true if the specified database supports JSON datatype.
     * @return {bool}
     * @api private
     */
async function isDbSupportJSON(knex) {
  if (isMSSQL(knex)) return false;
  if (!isMySQL(knex)) return true;
  const data = await knex.raw('select version() as version');
  const { version } = data[0][0];
  const extractedVersions = version.split('.');
  // Only mysql version > 5.7.8 supports JSON datatype
  return +extractedVersions[0] > 5
    || (extractedVersions[0] === '5'
      && (+extractedVersions[1] > 7
        || (+extractedVersions[1] === '7' && +extractedVersions[2] >= 8)
      )
    );
}

/*
     * Returns true if the specified knex instance is using postgresql.
     * @return {bool}
     * @api private
     */
function isPostgres(knex) {
  return ['postgresql'].indexOf(knex.client.dialect) > -1;
}

/*
     * Returns true if the specified knex instance is using oracle.
     * @return {bool}
     * @api private
     */
function isOracle(knex) {
  return ['oracle', 'oracledb'].indexOf(knex.client.dialect) > -1;
}

/*
   * Return datastore appropriate string of the current time
   * @api private
   * @return {String | date}
   */
function dateAsISO(knex, aDate) {
  let date;
  if (aDate != null) {
    date = new Date(aDate);
  } else {
    date = new Date();
  }
  if (isOracle(knex)) {
    return date;
  }
  return isMySQL(knex) || isMSSQL(knex)
    ? date
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    : date.toISOString();
}

/*
   * Returns PostgreSQL fast upsert query.
   * @return {string}
   * @api private
   */
function getPostgresFastQuery(tablename, sidfieldname) {
  return (
    `with new_values (${
      sidfieldname
    }, expired, sess) as (`
    + '  values (?, ?::timestamp with time zone, ?::json)'
    + '), '
    + 'upsert as '
    + '( '
    + `  update "${
      tablename
    }" cs set `
    + `    ${
      sidfieldname
    } = nv.${
      sidfieldname
    }, `
    + '    expired = nv.expired, '
    + '    sess = nv.sess '
    + '  from new_values nv '
    + `  where cs.${
      sidfieldname
    } = nv.${
      sidfieldname
    } `
    + '  returning cs.* '
    + ')'
    + `insert into "${
      tablename
    }" (${
      sidfieldname
    }, expired, sess) `
    + `select ${
      sidfieldname
    }, expired, sess `
    + 'from new_values '
    + `where not exists (select 1 from upsert up where up.${
      sidfieldname
    } = new_values.${
      sidfieldname
    })`
  );
}

/*
   * Returns SQLite fast upsert query.
   * @return {string}
   * @api private
   */
function getSqliteFastQuery(tablename, sidfieldname) {
  return (
    `insert or replace into ${
      tablename
    } (${
      sidfieldname
    }, expired, sess) values (?, ?, ?);`
  );
}

/*
   * Returns MySQL fast upsert query.
   * @return {string}
   * @api private
   */
function getMysqlFastQuery(tablename, sidfieldname) {
  return (
    `insert into ${
      tablename
    } (${
      sidfieldname
    }, expired, sess) values (?, ?, ?) on duplicate key update expired=values(expired), sess=values(sess);`
  );
}

/*
   * Returns MSSQL fast upsert query.
   * @return {string}
   * @api private
   */
function getMssqlFastQuery(tablename, sidfieldname) {
  return (
    `merge ${
      tablename
    } as T `
    + `using (values (?, ?, ?)) as S (${
      sidfieldname
    }, expired, sess) `
    + `on (T.${
      sidfieldname
    } = S.${
      sidfieldname
    }) `
    + 'when matched then '
    + 'update set expired = S.expired, sess = S.sess '
    + 'when not matched by target then '
    + `insert (${
      sidfieldname
    }, expired, sess) values (S.${
      sidfieldname
    }, S.expired, S.sess) `
    + 'output inserted.*;'
  );
}

/*
   * Return dialect-aware type name for timestamp
   * @return {String} type name for timestamp
   * @api private
   */
function timestampTypeName(knex) {
  // eslint-disable-next-line no-nested-ternary
  return isMySQL(knex) || isMSSQL(knex)
    ? 'DATETIME'
    : isPostgres(knex)
      ? 'timestamp with time zone'
      : 'timestamp';
}

/*
     * Return condition for filtering by expiration
     * @return {String} expired sql condition string
     * @api private
     */
function expiredCondition(knex) {
  let condition = `CAST(? as ${timestampTypeName(knex)}) <= expired`;
  if (isSqlite3(knex)) {
    // sqlite3 date condition is a special case.
    condition = 'datetime(?) <= datetime(expired)';
  } else if (isOracle(knex)) {
    condition = `CAST(? as ${timestampTypeName(knex)}) <= "expired"`;
  }
  return condition;
}

module.exports = {
  dateAsISO,
  getMssqlFastQuery,
  getMysqlFastQuery,
  getPostgresFastQuery,
  getSqliteFastQuery,
  isMSSQL,
  isMySQL,
  isOracle,
  isPostgres,
  isSqlite3,
  timestampTypeName,
  expiredCondition,
  isDbSupportJSON,
};
