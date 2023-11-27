// GENERATED by @edgedb/generate v0.3.4

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _sys_user from "./sys_user";
import type * as _std from "./std";
import type * as _default from "./default";
import type * as _sys_core from "./sys_core";
export type $StudentλShape = $.typeutil.flatten<_sys_user.$MgmtλShape & {
  "agencyId": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "person": $.LinkDesc<_default.$Person, $.Cardinality.One, {}, false, false,  false, false>;
  "owner": $.LinkDesc<_sys_core.$Org, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Student = $.ObjectType<"app_cm::Student", $StudentλShape, null, [
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $Student = $.makeType<$Student>(_.spec, "f579cecf-8229-11ee-9f43-ab5bce31b5c4", _.syntax.literal);

const Student: $.$expr_PathNode<$.TypeSet<$Student, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Student, $.Cardinality.Many), null);



export { $Student, Student };

type __defaultExports = {
  "Student": typeof Student
};
const __defaultExports: __defaultExports = {
  "Student": Student
};
export default __defaultExports;