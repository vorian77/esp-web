// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _sys_core from "./sys_core";
import type * as _default from "./default";
import type * as _sys_obj from "./sys_obj";
import type * as _app_cm_training from "./app_cm_training";
import type * as _sys_db from "./sys_db";
import type * as _app_cm from "./app_cm";
export type $MgmtλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "createdAt": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, true, true>;
  "modifiedAt": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, false>;
  "createdBy": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  true, false>;
  "modifiedBy": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $Mgmt = $.ObjectType<"sys_user::Mgmt", $MgmtλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $Mgmt = $.makeType<$Mgmt>(_.spec, "c7116676-71ae-11ee-8320-072310bd1979", _.syntax.literal);

const Mgmt: $.$expr_PathNode<$.TypeSet<$Mgmt, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Mgmt, $.Cardinality.Many), null);

export type $UserλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "userName": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "owner": $.LinkDesc<_sys_core.$ObjRoot, $.Cardinality.One, {}, false, false,  false, false>;
  "person": $.LinkDesc<_default.$Person, $.Cardinality.One, {}, false, false,  false, false>;
  "password": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "userTypes": $.LinkDesc<$UserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_user::Mgmt]": $.LinkDesc<$Mgmt, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::Obj]": $.LinkDesc<_sys_core.$Obj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::CodeType]": $.LinkDesc<_sys_core.$CodeType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_obj::DataObj]": $.LinkDesc<_sys_obj.$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_obj::DataObjAction]": $.LinkDesc<_sys_obj.$DataObjAction, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::Ent]": $.LinkDesc<_sys_core.$Ent, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::Org]": $.LinkDesc<_sys_core.$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::Code]": $.LinkDesc<_sys_core.$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_db::Table]": $.LinkDesc<_sys_db.$Table, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_obj::NodeObj]": $.LinkDesc<_sys_obj.$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_user::Staff]": $.LinkDesc<$Staff, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_user::Mgmt]": $.LinkDesc<$Mgmt, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::Obj]": $.LinkDesc<_sys_core.$Obj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::CodeType]": $.LinkDesc<_sys_core.$CodeType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_obj::DataObj]": $.LinkDesc<_sys_obj.$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_obj::DataObjAction]": $.LinkDesc<_sys_obj.$DataObjAction, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::Ent]": $.LinkDesc<_sys_core.$Ent, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::Org]": $.LinkDesc<_sys_core.$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::Code]": $.LinkDesc<_sys_core.$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_db::Table]": $.LinkDesc<_sys_db.$Table, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_obj::NodeObj]": $.LinkDesc<_sys_obj.$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_user::Staff]": $.LinkDesc<$Staff, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_user::UserType]": $.LinkDesc<$UserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_user::UserType]": $.LinkDesc<$UserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_user::Widget]": $.LinkDesc<$Widget, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_user::Widget]": $.LinkDesc<$Widget, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm::Client]": $.LinkDesc<_app_cm.$Client, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm::Client]": $.LinkDesc<_app_cm.$Client, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm::ServiceFlow]": $.LinkDesc<_app_cm.$ServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm::ServiceFlow]": $.LinkDesc<_app_cm.$ServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm::ClientServiceFlow]": $.LinkDesc<_app_cm.$ClientServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm::ClientServiceFlow]": $.LinkDesc<_app_cm.$ClientServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm_training::CsfCohort]": $.LinkDesc<_app_cm_training.$CsfCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_core::App]": $.LinkDesc<_sys_core.$App, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_core::App]": $.LinkDesc<_sys_core.$App, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is sys_obj::DataObjFieldItems]": $.LinkDesc<_sys_obj.$DataObjFieldItems, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is sys_obj::DataObjFieldItems]": $.LinkDesc<_sys_obj.$DataObjFieldItems, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm_training::CsfCohortAttd]": $.LinkDesc<_app_cm_training.$CsfCohortAttd, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm::CsfData]": $.LinkDesc<_app_cm.$CsfData, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm_training::CsfCohort]": $.LinkDesc<_app_cm_training.$CsfCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm::CsfData]": $.LinkDesc<_app_cm.$CsfData, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm::CsfNote]": $.LinkDesc<_app_cm.$CsfNote, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy[is app_cm_training::CsfCohortAttd]": $.LinkDesc<_app_cm_training.$CsfCohortAttd, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy[is app_cm::CsfNote]": $.LinkDesc<_app_cm.$CsfNote, $.Cardinality.Many, {}, false, false,  false, false>;
  "<createdBy": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<modifiedBy": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"sys_user::User", $UserλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
]>;
const $User = $.makeType<$User>(_.spec, "c77c2ba5-71ae-11ee-aaff-63669acf1f56", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null);

export type $SYS_USERλShape = $.typeutil.flatten<$UserλShape & {
}>;
type $SYS_USER = $.ObjectType<"sys_user::SYS_USER", $SYS_USERλShape, null, [
  ...$User['__exclusives__'],
]>;
const $SYS_USER = $.makeType<$SYS_USER>(_.spec, "9cf604d8-93c6-11ee-8373-df126f29de1c", _.syntax.literal);

const SYS_USER: $.$expr_PathNode<$.TypeSet<$SYS_USER, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SYS_USER, $.Cardinality.Many), null);

export type $SYS_USER_IDλShape = $.typeutil.flatten<$UserλShape & {
}>;
type $SYS_USER_ID = $.ObjectType<"sys_user::SYS_USER_ID", $SYS_USER_IDλShape, null, [
  ...$User['__exclusives__'],
]>;
const $SYS_USER_ID = $.makeType<$SYS_USER_ID>(_.spec, "9d0df5af-93c6-11ee-a425-39f539f76191", _.syntax.literal);

const SYS_USER_ID: $.$expr_PathNode<$.TypeSet<$SYS_USER_ID, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SYS_USER_ID, $.Cardinality.Many), null);

export type $StaffλShape = $.typeutil.flatten<$MgmtλShape & {
  "person": $.LinkDesc<_default.$Person, $.Cardinality.One, {}, false, false,  false, false>;
  "roles": $.LinkDesc<_sys_core.$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "owner": $.LinkDesc<_sys_core.$ObjRoot, $.Cardinality.One, {}, false, false,  false, false>;
  "<staffAdmin[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffAgency[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffInstructor[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffAdmin[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffAgency[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffAdmin": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffAgency": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<staffInstructor": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Staff = $.ObjectType<"sys_user::Staff", $StaffλShape, null, [
  ...$Mgmt['__exclusives__'],
]>;
const $Staff = $.makeType<$Staff>(_.spec, "862399d9-824a-11ee-87eb-f7db66b6dadd", _.syntax.literal);

const Staff: $.$expr_PathNode<$.TypeSet<$Staff, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Staff, $.Cardinality.Many), null);

export type $UserTypeλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
  "resources": $.LinkDesc<_sys_core.$Obj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypes[is sys_user::User]": $.LinkDesc<$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypes[is sys_user::SYS_USER]": $.LinkDesc<$SYS_USER, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypes[is sys_user::SYS_USER_ID]": $.LinkDesc<$SYS_USER_ID, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypes[is sys_user::currentUser]": $.LinkDesc<$currentUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypeDefault[is sys_core::Org]": $.LinkDesc<_sys_core.$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypeDefault": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<userTypes": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $UserType = $.ObjectType<"sys_user::UserType", $UserTypeλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $UserType = $.makeType<$UserType>(_.spec, "c788be60-71ae-11ee-893e-0b97dd6a9d59", _.syntax.literal);

const UserType: $.$expr_PathNode<$.TypeSet<$UserType, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($UserType, $.Cardinality.Many), null);

export type $WidgetλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
}>;
type $Widget = $.ObjectType<"sys_user::Widget", $WidgetλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $Widget = $.makeType<$Widget>(_.spec, "c78ecdc6-71ae-11ee-b0d3-efbf65d6a32f", _.syntax.literal);

const Widget: $.$expr_PathNode<$.TypeSet<$Widget, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Widget, $.Cardinality.Many), null);

export type $currentUserλShape = $.typeutil.flatten<$UserλShape & {
}>;
type $currentUser = $.ObjectType<"sys_user::currentUser", $currentUserλShape, null, [
  ...$User['__exclusives__'],
]>;
const $currentUser = $.makeType<$currentUser>(_.spec, "9d1921f6-93c6-11ee-983c-7fa3ad4add04", _.syntax.literal);

const currentUser: $.$expr_PathNode<$.TypeSet<$currentUser, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($currentUser, $.Cardinality.Many), null);

type getStaffByNameλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $Staff, $.cardutil.overrideLowerBound<$.cardutil.multiplyCardinalities<$.cardutil.paramCardinality<P1>, $.cardutil.paramCardinality<P2>>, 'Zero'>
>;
function getStaffByName<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  firstName: P1,
  lastName: P2,
): getStaffByNameλFuncExpr<P1, P2>;
function getStaffByName(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_user::getStaffByName', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}, {typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "862399d9-824a-11ee-87eb-f7db66b6dadd", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_user::getStaffByName",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getUserλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $User, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getUser<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  userName: P1,
): getUserλFuncExpr<P1>;
function getUser(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_user::getUser', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c77c2ba5-71ae-11ee-aaff-63669acf1f56", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_user::getUser",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getUserTypeλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $UserType, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getUserType<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  userTypeName: P1,
): getUserTypeλFuncExpr<P1>;
function getUserType(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_user::getUserType', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c788be60-71ae-11ee-893e-0b97dd6a9d59", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_user::getUserType",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getWidgetλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $Widget, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getWidget<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  widgetName: P1,
): getWidgetλFuncExpr<P1>;
function getWidget(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_user::getWidget', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c78ecdc6-71ae-11ee-b0d3-efbf65d6a32f", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_user::getWidget",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

const $sys_user__globals: {  SYS_USER: _.syntax.$expr_Global<
              // "sys_user::SYS_USER",
              $SYS_USER,
              $.Cardinality.AtMostOne
              >,  SYS_USER_ID: _.syntax.$expr_Global<
              // "sys_user::SYS_USER_ID",
              $SYS_USER_ID,
              $.Cardinality.AtMostOne
              >,  currentUser: _.syntax.$expr_Global<
              // "sys_user::currentUser",
              $currentUser,
              $.Cardinality.AtMostOne
              >,  currentUserId: _.syntax.$expr_Global<
              // "sys_user::currentUserId",
              _std.$uuid,
              $.Cardinality.AtMostOne
              >} = {  SYS_USER: _.syntax.makeGlobal(
              "sys_user::SYS_USER",
              $.makeType(_.spec, "9cf604d8-93c6-11ee-8373-df126f29de1c", _.syntax.literal),
              $.Cardinality.AtMostOne) as any,  SYS_USER_ID: _.syntax.makeGlobal(
              "sys_user::SYS_USER_ID",
              $.makeType(_.spec, "9d0df5af-93c6-11ee-a425-39f539f76191", _.syntax.literal),
              $.Cardinality.AtMostOne) as any,  currentUser: _.syntax.makeGlobal(
              "sys_user::currentUser",
              $.makeType(_.spec, "9d1921f6-93c6-11ee-983c-7fa3ad4add04", _.syntax.literal),
              $.Cardinality.AtMostOne) as any,  currentUserId: _.syntax.makeGlobal(
              "sys_user::currentUserId",
              $.makeType(_.spec, "00000000-0000-0000-0000-000000000100", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $Mgmt, Mgmt, $User, User, $SYS_USER, SYS_USER, $SYS_USER_ID, SYS_USER_ID, $Staff, Staff, $UserType, UserType, $Widget, Widget, $currentUser, currentUser };

type __defaultExports = {
  "Mgmt": typeof Mgmt;
  "User": typeof User;
  "SYS_USER": typeof SYS_USER;
  "SYS_USER_ID": typeof SYS_USER_ID;
  "Staff": typeof Staff;
  "UserType": typeof UserType;
  "Widget": typeof Widget;
  "currentUser": typeof currentUser;
  "getStaffByName": typeof getStaffByName;
  "getUser": typeof getUser;
  "getUserType": typeof getUserType;
  "getWidget": typeof getWidget;
  "global": typeof $sys_user__globals
};
const __defaultExports: __defaultExports = {
  "Mgmt": Mgmt,
  "User": User,
  "SYS_USER": SYS_USER,
  "SYS_USER_ID": SYS_USER_ID,
  "Staff": Staff,
  "UserType": UserType,
  "Widget": Widget,
  "currentUser": currentUser,
  "getStaffByName": getStaffByName,
  "getUser": getUser,
  "getUserType": getUserType,
  "getWidget": getWidget,
  "global": $sys_user__globals
};
export default __defaultExports;
