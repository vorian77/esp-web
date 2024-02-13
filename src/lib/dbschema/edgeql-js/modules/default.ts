// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _sys_core from "./sys_core";
import type * as _cal from "./cal";
import type * as _sys_user from "./sys_user";
import type * as _app_cm from "./app_cm";
export type $Name = $.ScalarType<"std::str", string>;
const Name: $.scalarTypeWithConstructor<_std.$str, never> = $.makeType<$.scalarTypeWithConstructor<_std.$str, never>>(_.spec, "5061cd07-b3c2-11ee-b459-95308b4e5073", _.syntax.literal);

export type $nonNegative = $.ScalarType<"std::number", number>;
const nonNegative: $.scalarTypeWithConstructor<_std.$number, string> = $.makeType<$.scalarTypeWithConstructor<_std.$number, string>>(_.spec, "50312c72-b3c2-11ee-8e6a-23f218a1f329", _.syntax.literal);

export type $SysPersonλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "firstName": $.PropertyDesc<$Name, $.Cardinality.One, false, false, false, false>;
  "lastName": $.PropertyDesc<$Name, $.Cardinality.One, false, false, false, false>;
  "codeEthnicity": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeGender": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeRace": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeState": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "addr1": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "addr2": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "avatar": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "birthDate": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "city": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "email": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "favFood": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "fullName": $.PropertyDesc<_std.$str, $.Cardinality.One, false, true, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "phoneMobile": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "zip": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "phoneAlt": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<person[is sys_user::SysStaff]": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::UserRoot]": $.LinkDesc<_sys_user.$UserRoot, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::SysUser]": $.LinkDesc<_sys_user.$SysUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::SYS_USER]": $.LinkDesc<_sys_user.$SYS_USER, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::SYS_USER_ID]": $.LinkDesc<_sys_user.$SYS_USER_ID, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is sys_user::currentUser]": $.LinkDesc<_sys_user.$currentUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person[is app_cm::CmClient]": $.LinkDesc<_app_cm.$CmClient, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contact[is app_cm::CmEmployer]": $.LinkDesc<_app_cm.$CmEmployer, $.Cardinality.Many, {}, false, false,  false, false>;
  "<contact": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<person": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $SysPerson = $.ObjectType<"default::SysPerson", $SysPersonλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $SysPerson = $.makeType<$SysPerson>(_.spec, "5061da6e-b3c2-11ee-bf41-01b5a8f3a48e", _.syntax.literal);

const SysPerson: $.$expr_PathNode<$.TypeSet<$SysPerson, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SysPerson, $.Cardinality.Many), null);



export { Name, nonNegative, $SysPerson, SysPerson };

type __defaultExports = {
  "Name": typeof Name;
  "nonNegative": typeof nonNegative;
  "SysPerson": typeof SysPerson
};
const __defaultExports: __defaultExports = {
  "Name": Name,
  "nonNegative": nonNegative,
  "SysPerson": SysPerson
};
export default __defaultExports;
