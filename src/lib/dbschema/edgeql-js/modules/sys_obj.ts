// GENERATED by @edgedb/generate v0.3.4

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _sys_core from "./sys_core";
import type * as _sys_db from "./sys_db";
import type * as _std from "./std";
import type * as _default from "./default";
export type $DataObjλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
  "codeCardinality": $.LinkDesc<_sys_core.$Code, $.Cardinality.One, {}, false, false,  false, false>;
  "codeComponent": $.LinkDesc<_sys_core.$Code, $.Cardinality.One, {}, false, false,  false, false>;
  "table": $.LinkDesc<_sys_db.$Table, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "exprFilter": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "exprObject": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "isPopup": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "link": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "subHeader": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "actions": $.LinkDesc<$DataObjAction, $.Cardinality.Many, {}, false, false,  false, false>;
  "<dataObj[is sys_obj::NodeObj]": $.LinkDesc<$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<dataObj": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $DataObj = $.ObjectType<"sys_obj::DataObj", $DataObjλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $DataObj = $.makeType<$DataObj>(_.spec, "c7694e8b-71ae-11ee-94f4-b7ed0524d481", _.syntax.literal);

const DataObj: $.$expr_PathNode<$.TypeSet<$DataObj, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($DataObj, $.Cardinality.Many), null);

export type $DataObjActionλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
  "order": $.PropertyDesc<_default.$nonNegative, $.Cardinality.One, false, false, false, false>;
  "color": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<actions[is sys_obj::DataObj]": $.LinkDesc<$DataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<actions[is sys_obj::Form]": $.LinkDesc<$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<actions": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $DataObjAction = $.ObjectType<"sys_obj::DataObjAction", $DataObjActionλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $DataObjAction = $.makeType<$DataObjAction>(_.spec, "c76e660b-71ae-11ee-9c52-ef51abe79945", _.syntax.literal);

const DataObjAction: $.$expr_PathNode<$.TypeSet<$DataObjAction, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($DataObjAction, $.Cardinality.Many), null);

export type $FormλShape = $.typeutil.flatten<$DataObjλShape & {
  "submitButtonLabel": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "fieldsDb": $.LinkDesc<$FormFieldDb, $.Cardinality.Many, {}, false, false,  false, false>;
  "fieldsEl": $.LinkDesc<$FormFieldEl, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Form = $.ObjectType<"sys_obj::Form", $FormλShape, null, [
  ...$DataObj['__exclusives__'],
]>;
const $Form = $.makeType<$Form>(_.spec, "c7ac7bd7-71ae-11ee-8e85-37c88c05f269", _.syntax.literal);

const Form: $.$expr_PathNode<$.TypeSet<$Form, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Form, $.Cardinality.Many), null);

export type $FormFieldDbλShape = $.typeutil.flatten<_std.$Object_6b06be9b27fe11ee83ff159af7e1bb81λShape & {
  "exprFilter": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "exprPreset": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeDbDataOp": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeDbDataSource": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeDbListDir": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "column": $.LinkDesc<_sys_db.$Column, $.Cardinality.One, {}, false, false,  false, false>;
  "dbDataSourceKey": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "dbOrderList": $.PropertyDesc<_default.$nonNegative, $.Cardinality.AtMostOne, false, false, false, false>;
  "dbOrderSelect": $.PropertyDesc<_default.$nonNegative, $.Cardinality.AtMostOne, false, false, false, false>;
  "isDbAllowNull": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "fieldName": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "isDbFilter": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "isLinkMember": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "<fieldsDb[is sys_obj::FormFieldItemsList]": $.LinkDesc<$FormFieldItemsList, $.Cardinality.Many, {}, false, false,  false, false>;
  "<fieldsDb[is sys_obj::Form]": $.LinkDesc<$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<fieldsDb": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $FormFieldDb = $.ObjectType<"sys_obj::FormFieldDb", $FormFieldDbλShape, null, [
  ..._std.$Object_6b06be9b27fe11ee83ff159af7e1bb81['__exclusives__'],
]>;
const $FormFieldDb = $.makeType<$FormFieldDb>(_.spec, "c7a7a524-71ae-11ee-900c-6b2d971bdd5a", _.syntax.literal);

const FormFieldDb: $.$expr_PathNode<$.TypeSet<$FormFieldDb, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($FormFieldDb, $.Cardinality.Many), null);

export type $FormFieldElλShape = $.typeutil.flatten<_std.$Object_6b06be9b27fe11ee83ff159af7e1bb81λShape & {
  "headerAlt": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeCustomElType": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "customElParms": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeAccess": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeElement": $.LinkDesc<_sys_core.$Code, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "column": $.LinkDesc<_sys_db.$Column, $.Cardinality.One, {}, false, false,  false, false>;
  "height": $.PropertyDesc<_std.$int16, $.Cardinality.AtMostOne, false, false, false, false>;
  "isDisplay": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "isDisplayable": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "width": $.PropertyDesc<_std.$int16, $.Cardinality.AtMostOne, false, false, false, false>;
  "itemsList": $.LinkDesc<$FormFieldItemsList, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "dbOrderSelect": $.PropertyDesc<_default.$nonNegative, $.Cardinality.AtMostOne, false, false, false, false>;
  "itemsListParms": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "items": $.PropertyDesc<$.ArrayType<_std.$json>, $.Cardinality.AtMostOne, false, false, false, false>;
  "<fieldsEl[is sys_obj::Form]": $.LinkDesc<$Form, $.Cardinality.Many, {}, false, false,  false, false>;
  "<fieldsEl": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $FormFieldEl = $.ObjectType<"sys_obj::FormFieldEl", $FormFieldElλShape, null, [
  ..._std.$Object_6b06be9b27fe11ee83ff159af7e1bb81['__exclusives__'],
]>;
const $FormFieldEl = $.makeType<$FormFieldEl>(_.spec, "f2fba802-759e-11ee-a737-330989e7fe6c", _.syntax.literal);

const FormFieldEl: $.$expr_PathNode<$.TypeSet<$FormFieldEl, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($FormFieldEl, $.Cardinality.Many), null);

export type $FormFieldItemsListλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
  "fieldsDb": $.LinkDesc<$FormFieldDb, $.Cardinality.Many, {}, false, false,  false, false>;
  "dbSelect": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "propertyId": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "propertyLabel": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<itemsList[is sys_obj::FormFieldEl]": $.LinkDesc<$FormFieldEl, $.Cardinality.Many, {}, false, false,  false, false>;
  "<itemsList": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $FormFieldItemsList = $.ObjectType<"sys_obj::FormFieldItemsList", $FormFieldItemsListλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $FormFieldItemsList = $.makeType<$FormFieldItemsList>(_.spec, "8729f0d8-80f9-11ee-b72c-8d6ac69868d5", _.syntax.literal);

const FormFieldItemsList: $.$expr_PathNode<$.TypeSet<$FormFieldItemsList, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($FormFieldItemsList, $.Cardinality.Many), null);

export type $NodeObjλShape = $.typeutil.flatten<_sys_core.$ObjλShape & {
  "codeIcon": $.LinkDesc<_sys_core.$Code, $.Cardinality.One, {}, false, false,  false, false>;
  "codeType": $.LinkDesc<_sys_core.$Code, $.Cardinality.One, {}, false, false,  false, false>;
  "dataObj": $.LinkDesc<$DataObj, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "parent": $.LinkDesc<$NodeObj, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "order": $.PropertyDesc<_default.$nonNegative, $.Cardinality.One, false, false, false, false>;
  "page": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<parent[is sys_obj::NodeObj]": $.LinkDesc<$NodeObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parent": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $NodeObj = $.ObjectType<"sys_obj::NodeObj", $NodeObjλShape, null, [
  ..._sys_core.$Obj['__exclusives__'],
]>;
const $NodeObj = $.makeType<$NodeObj>(_.spec, "c772cba6-71ae-11ee-887e-ad6bab7f4657", _.syntax.literal);

const NodeObj: $.$expr_PathNode<$.TypeSet<$NodeObj, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($NodeObj, $.Cardinality.Many), null);

type getDataObjλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $DataObj, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getDataObj<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  dataObjName: P1,
): getDataObjλFuncExpr<P1>;
function getDataObj(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_obj::getDataObj', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c7694e8b-71ae-11ee-94f4-b7ed0524d481", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_obj::getDataObj",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getDataObjActionλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $DataObjAction, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getDataObjAction<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  dataObjActionName: P1,
): getDataObjActionλFuncExpr<P1>;
function getDataObjAction(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_obj::getDataObjAction', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c76e660b-71ae-11ee-9c52-ef51abe79945", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_obj::getDataObjAction",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getNodeObjByNameλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $NodeObj, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getNodeObjByName<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  nodeObjName: P1,
): getNodeObjByNameλFuncExpr<P1>;
function getNodeObjByName(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_obj::getNodeObjByName', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c772cba6-71ae-11ee-887e-ad6bab7f4657", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_obj::getNodeObjByName",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getFormFieldItemsListλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $FormFieldItemsList, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getFormFieldItemsList<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  name: P1,
): getFormFieldItemsListλFuncExpr<P1>;
function getFormFieldItemsList(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_obj::getFormFieldItemsList', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "8729f0d8-80f9-11ee-b72c-8d6ac69868d5", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_obj::getFormFieldItemsList",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getNodeObjByIdλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $NodeObj, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getNodeObjById<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  nodeObjId: P1,
): getNodeObjByIdλFuncExpr<P1>;
function getNodeObjById(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_obj::getNodeObjById', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "c772cba6-71ae-11ee-887e-ad6bab7f4657", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_obj::getNodeObjById",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { $DataObj, DataObj, $DataObjAction, DataObjAction, $Form, Form, $FormFieldDb, FormFieldDb, $FormFieldEl, FormFieldEl, $FormFieldItemsList, FormFieldItemsList, $NodeObj, NodeObj };

type __defaultExports = {
  "DataObj": typeof DataObj;
  "DataObjAction": typeof DataObjAction;
  "Form": typeof Form;
  "FormFieldDb": typeof FormFieldDb;
  "FormFieldEl": typeof FormFieldEl;
  "FormFieldItemsList": typeof FormFieldItemsList;
  "NodeObj": typeof NodeObj;
  "getDataObj": typeof getDataObj;
  "getDataObjAction": typeof getDataObjAction;
  "getNodeObjByName": typeof getNodeObjByName;
  "getFormFieldItemsList": typeof getFormFieldItemsList;
  "getNodeObjById": typeof getNodeObjById
};
const __defaultExports: __defaultExports = {
  "DataObj": DataObj,
  "DataObjAction": DataObjAction,
  "Form": Form,
  "FormFieldDb": FormFieldDb,
  "FormFieldEl": FormFieldEl,
  "FormFieldItemsList": FormFieldItemsList,
  "NodeObj": NodeObj,
  "getDataObj": getDataObj,
  "getDataObjAction": getDataObjAction,
  "getNodeObjByName": getNodeObjByName,
  "getFormFieldItemsList": getFormFieldItemsList,
  "getNodeObjById": getNodeObjById
};
export default __defaultExports;
