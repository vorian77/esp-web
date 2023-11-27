// GENERATED by @edgedb/generate v0.3.4

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
import type * as _sys_user from "./sys_user";
import type * as _sys_obj from "./sys_obj";
import type * as _sys_db from "./sys_db";
import type * as _app_cm_training from "./app_cm_training";
import type * as _default from "./default";
import type * as _app_cm from "./app_cm";
export type $ObjRootλShape = $.typeutil.flatten<_std.$Object_6b06be9b27fe11ee83ff159af7e1bb81λShape & {
  "header": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<owner[is sys_user::Staff]": $.LinkDesc<_sys_user.$Staff, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_obj::FormFieldItemsList]": $.LinkDesc<_sys_obj.$FormFieldItemsList, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::CodeType]": $.LinkDesc<$CodeType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::Obj]": $.LinkDesc<$Obj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::Code]": $.LinkDesc<$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::Ent]": $.LinkDesc<$Ent, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_db::Table]": $.LinkDesc<_sys_db.$Table, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_obj::DataObj]": $.LinkDesc<_sys_obj.$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_obj::DataObjAction]": $.LinkDesc<_sys_obj.$DataObjAction, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_obj::NodeObj]": $.LinkDesc<_sys_obj.$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::UserType]": $.LinkDesc<_sys_user.$UserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::Widget]": $.LinkDesc<_sys_user.$Widget, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::App]": $.LinkDesc<$App, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::User]": $.LinkDesc<_sys_user.$User, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::SYS_USER]": $.LinkDesc<_sys_user.$SYS_USER, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::SYS_USER_ID]": $.LinkDesc<_sys_user.$SYS_USER_ID, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_user::currentUser]": $.LinkDesc<_sys_user.$currentUser, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_obj::Form]": $.LinkDesc<_sys_obj.$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is sys_core::Org]": $.LinkDesc<$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $ObjRoot = $.ObjectType<"sys_core::ObjRoot", $ObjRootλShape, null, [
  ..._std.$Object_6b06be9b27fe11ee83ff159af7e1bb81['__exclusives__'],
]>;
const $ObjRoot = $.makeType<$ObjRoot>(_.spec, "c70fc143-71ae-11ee-a4be-030761bf4975", _.syntax.literal);

const ObjRoot: $.$expr_PathNode<$.TypeSet<$ObjRoot, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($ObjRoot, $.Cardinality.Many), null);

export type $ObjλShape = $.typeutil.flatten<$ObjRootλShape & _sys_user.$MgmtλShape & {
  "owner": $.LinkDesc<$ObjRoot, $.Cardinality.One, {}, false, false,  false, false>;
  "<resources[is sys_user::UserType]": $.LinkDesc<_sys_user.$UserType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<resources": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Obj = $.ObjectType<"sys_core::Obj", $ObjλShape, null, [
  ...$ObjRoot['__exclusives__'],
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $Obj = $.makeType<$Obj>(_.spec, "c713ff25-71ae-11ee-86aa-7d4714184725", _.syntax.literal);

const Obj: $.$expr_PathNode<$.TypeSet<$Obj, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Obj, $.Cardinality.Many), null);

export type $EntλShape = $.typeutil.flatten<$ObjλShape & {
  "roles": $.LinkDesc<$Code, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Ent = $.ObjectType<"sys_core::Ent", $EntλShape, null, [
  ...$Obj['__exclusives__'],
]>;
const $Ent = $.makeType<$Ent>(_.spec, "c7213056-71ae-11ee-aa1e-490c85a86c6b", _.syntax.literal);

const Ent: $.$expr_PathNode<$.TypeSet<$Ent, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Ent, $.Cardinality.Many), null);

export type $AppλShape = $.typeutil.flatten<$EntλShape & {
}>;
type $App = $.ObjectType<"sys_core::App", $AppλShape, null, [
  ...$Ent['__exclusives__'],
]>;
const $App = $.makeType<$App>(_.spec, "c7a33fa4-71ae-11ee-9532-19f8ece6209e", _.syntax.literal);

const App: $.$expr_PathNode<$.TypeSet<$App, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($App, $.Cardinality.Many), null);

export type $CodeλShape = $.typeutil.flatten<$ObjλShape & {
  "codeType": $.LinkDesc<$CodeType, $.Cardinality.One, {}, false, false,  false, false>;
  "valueDecimal": $.PropertyDesc<_std.$decimal, $.Cardinality.AtMostOne, false, false, false, false>;
  "valueInteger": $.PropertyDesc<_std.$int64, $.Cardinality.AtMostOne, false, false, false, false>;
  "valueString": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "parent": $.LinkDesc<$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "order": $.PropertyDesc<_default.$nonNegative, $.Cardinality.One, false, false, false, false>;
  "<codeAccess[is sys_obj::FormFieldEl]": $.LinkDesc<_sys_obj.$FormFieldEl, $.Cardinality.Many, {}, false, false,  false, false>;
  "<roles[is sys_core::Ent]": $.LinkDesc<$Ent, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeElement[is sys_obj::FormFieldEl]": $.LinkDesc<_sys_obj.$FormFieldEl, $.Cardinality.Many, {}, false, false,  false, false>;
  "<roles[is sys_core::App]": $.LinkDesc<$App, $.Cardinality.Many, {}, false, false,  false, false>;
  "<roles[is sys_core::Org]": $.LinkDesc<$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<roles[is sys_user::Staff]": $.LinkDesc<_sys_user.$Staff, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeAlignment[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parent[is sys_core::Code]": $.LinkDesc<$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeStatus[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDataType[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeCardinality[is sys_obj::DataObj]": $.LinkDesc<_sys_obj.$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeComponent[is sys_obj::DataObj]": $.LinkDesc<_sys_obj.$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeIcon[is sys_obj::NodeObj]": $.LinkDesc<_sys_obj.$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeType[is sys_obj::NodeObj]": $.LinkDesc<_sys_obj.$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeStatus[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbDataOp[is sys_obj::FormFieldDb]": $.LinkDesc<_sys_obj.$FormFieldDb, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbDataSource[is sys_obj::FormFieldDb]": $.LinkDesc<_sys_obj.$FormFieldDb, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiCerts[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiExams[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiItemsIncluded[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiItemsNotIncluded[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeComponent[is sys_obj::Form]": $.LinkDesc<_sys_obj.$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeCardinality[is sys_obj::Form]": $.LinkDesc<_sys_obj.$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbListDir[is sys_obj::FormFieldDb]": $.LinkDesc<_sys_obj.$FormFieldDb, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiRqmts[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeSector[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeRace[is Person]": $.LinkDesc<_default.$Person, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeState[is Person]": $.LinkDesc<_default.$Person, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDataTypePreset[is sys_db::Column]": $.LinkDesc<_sys_db.$Column, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeAccess": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeAlignment": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeCardinality": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeComponent": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDataType": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDataTypePreset": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbDataOp": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbDataSource": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeDbListDir": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeElement": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeIcon": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiCerts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiExams": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiItemsIncluded": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiItemsNotIncluded": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeMultiRqmts": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeRace": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeSector": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeState": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeStatus": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeType": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parent": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<roles": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Code = $.ObjectType<"sys_core::Code", $CodeλShape, null, [
  ...$Obj['__exclusives__'],
]>;
const $Code = $.makeType<$Code>(_.spec, "c71b234d-71ae-11ee-b405-8b6330d60052", _.syntax.literal);

const Code: $.$expr_PathNode<$.TypeSet<$Code, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Code, $.Cardinality.Many), null);

export type $CodeTypeλShape = $.typeutil.flatten<$ObjλShape & {
  "parent": $.LinkDesc<$CodeType, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "order": $.PropertyDesc<_default.$nonNegative, $.Cardinality.One, false, false, false, false>;
  "<parent[is sys_core::CodeType]": $.LinkDesc<$CodeType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeType[is sys_core::Code]": $.LinkDesc<$Code, $.Cardinality.Many, {}, false, false,  false, false>;
  "<state[is sys_core::Org]": $.LinkDesc<$Org, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeTypePayment[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeType": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<codeTypePayment": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parent": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<state": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CodeType = $.ObjectType<"sys_core::CodeType", $CodeTypeλShape, null, [
  ...$Obj['__exclusives__'],
]>;
const $CodeType = $.makeType<$CodeType>(_.spec, "c716db26-71ae-11ee-b947-8b586685201f", _.syntax.literal);

const CodeType: $.$expr_PathNode<$.TypeSet<$CodeType, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CodeType, $.Cardinality.Many), null);

export type $OrgλShape = $.typeutil.flatten<$EntλShape & {
  "state": $.LinkDesc<$CodeType, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "addr1": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "addr2": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "city": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "zip": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<venue[is app_cm_training::Cohort]": $.LinkDesc<_app_cm_training.$Cohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<provider[is app_cm_training::Course]": $.LinkDesc<_app_cm_training.$Course, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner[is app_cm::Student]": $.LinkDesc<_app_cm.$Student, $.Cardinality.Many, {}, false, false,  false, false>;
  "<owner": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<provider": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<venue": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Org = $.ObjectType<"sys_core::Org", $OrgλShape, null, [
  ...$Ent['__exclusives__'],
]>;
const $Org = $.makeType<$Org>(_.spec, "9fe7f155-81bc-11ee-8e7b-ed45f9960603", _.syntax.literal);

const Org: $.$expr_PathNode<$.TypeSet<$Org, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Org, $.Cardinality.Many), null);

type getCodeTypeλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $CodeType, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getCodeType<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  codeTypeName: P1,
): getCodeTypeλFuncExpr<P1>;
function getCodeType(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_core::getCodeType', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c716db26-71ae-11ee-b947-8b586685201f", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_core::getCodeType",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getEntλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $Ent, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getEnt<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  entName: P1,
): getEntλFuncExpr<P1>;
function getEnt(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_core::getEnt', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c7213056-71ae-11ee-aa1e-490c85a86c6b", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_core::getEnt",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getCodeλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $Code, $.cardutil.overrideLowerBound<$.cardutil.multiplyCardinalities<$.cardutil.paramCardinality<P1>, $.cardutil.paramCardinality<P2>>, 'Zero'>
>;
function getCode<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
  P2 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  codeTypeName: P1,
  codeName: P2,
): getCodeλFuncExpr<P1, P2>;
function getCode(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_core::getCode', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}, {typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c71b234d-71ae-11ee-b405-8b6330d60052", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_core::getCode",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getRootλFuncExpr = $.$expr_Function<
  $ObjRoot, $.cardutil.overrideLowerBound<$.Cardinality.One, 'Zero'>
>;
function getRoot(): getRootλFuncExpr;
function getRoot(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_core::getRoot', args, _.spec, [
    {args: [], returnTypeId: "c70fc143-71ae-11ee-a4be-030761bf4975", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_core::getRoot",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getOrgλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $Org, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getOrg<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  name: P1,
): getOrgλFuncExpr<P1>;
function getOrg(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_core::getOrg', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "9fe7f155-81bc-11ee-8e7b-ed45f9960603", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_core::getOrg",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { $ObjRoot, ObjRoot, $Obj, Obj, $Ent, Ent, $App, App, $Code, Code, $CodeType, CodeType, $Org, Org };

type __defaultExports = {
  "ObjRoot": typeof ObjRoot;
  "Obj": typeof Obj;
  "Ent": typeof Ent;
  "App": typeof App;
  "Code": typeof Code;
  "CodeType": typeof CodeType;
  "Org": typeof Org;
  "getCodeType": typeof getCodeType;
  "getEnt": typeof getEnt;
  "getCode": typeof getCode;
  "getRoot": typeof getRoot;
  "getOrg": typeof getOrg
};
const __defaultExports: __defaultExports = {
  "ObjRoot": ObjRoot,
  "Obj": Obj,
  "Ent": Ent,
  "App": App,
  "Code": Code,
  "CodeType": CodeType,
  "Org": Org,
  "getCodeType": getCodeType,
  "getEnt": getEnt,
  "getCode": getCode,
  "getRoot": getRoot,
  "getOrg": getOrg
};
export default __defaultExports;