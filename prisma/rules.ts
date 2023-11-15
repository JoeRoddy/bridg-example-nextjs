import { DbRules } from 'bridg/server';

// https://github.com/joeroddy/bridg#database-rules
export const rules: DbRules = {
  // global default, allow/block non-specified queries, set to true only in development
  default: false,
  // tableName: false | true,       - block/allow all queries on a table
  user: {
    // find: (uid) => ({ id: uid }) - query based authorization
    find: (uid) => true,
    update: (uid, data) => true,
    create: (uid, data) => true,
    delete: (uid) => true,
  },
  blog: {
    find: (uid) => true,
    update: (uid, data) => true,
    create: (uid, data) => true,
    delete: (uid) => true,
  },
};
