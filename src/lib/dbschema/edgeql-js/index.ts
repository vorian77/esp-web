// GENERATED by @edgedb/generate v0.4.1

export * from "./external";
export { createClient } from "edgedb";
import * as $ from "./reflection";
import * as $syntax from "./syntax";
import * as $op from "./operators";
import _std from "./modules/std";
import _cal from "./modules/cal";
import _cfg from "./modules/cfg";
import _default from "./modules/default";
import _fts from "./modules/fts";
import _schema from "./modules/schema";
import _sys from "./modules/sys";
import _sys_user from "./modules/sys_user";
import _app_cm from "./modules/app_cm";
import _sys_core from "./modules/sys_core";
import _sys_admin from "./modules/sys_admin";
import _sys_db from "./modules/sys_db";
import _sys_test from "./modules/sys_test";
import _math from "./modules/math";

const ExportDefault: typeof _std & 
  typeof _default & 
  $.util.OmitDollarPrefixed<typeof $syntax> & 
  typeof $op & {
  "std": typeof _std;
  "cal": typeof _cal;
  "cfg": typeof _cfg;
  "default": typeof _default;
  "fts": typeof _fts;
  "schema": typeof _schema;
  "sys": typeof _sys;
  "sys_user": typeof _sys_user;
  "app_cm": typeof _app_cm;
  "sys_core": typeof _sys_core;
  "sys_admin": typeof _sys_admin;
  "sys_db": typeof _sys_db;
  "sys_test": typeof _sys_test;
  "math": typeof _math;
} = {
  ..._std,
  ..._default,
  ...$.util.omitDollarPrefixed($syntax),
  ...$op,
  "std": _std,
  "cal": _cal,
  "cfg": _cfg,
  "default": _default,
  "fts": _fts,
  "schema": _schema,
  "sys": _sys,
  "sys_user": _sys_user,
  "app_cm": _app_cm,
  "sys_core": _sys_core,
  "sys_admin": _sys_admin,
  "sys_db": _sys_db,
  "sys_test": _sys_test,
  "math": _math,
};
const Cardinality = $.Cardinality;
type Cardinality = $.Cardinality;
export type Set<
  Type extends $.BaseType,
  Card extends $.Cardinality = $.Cardinality.Many
> = $.TypeSet<Type, Card>;


export default ExportDefault;
export { Cardinality };
