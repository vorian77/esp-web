// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _sys_core from "./sys_core";
import type * as _std from "./std";
import type * as _default from "./default";
export type $SysColumnλShape = $.typeutil.flatten<_sys_core.$SysObjλShape & {
  "codeAlignment": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeDataType": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "classValue": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "exprStorageKey": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "headerSide": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "link": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "matchColumn": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "maxLength": $.PropertyDesc<_default.$nonNegative, $.Cardinality.AtMostOne, false, false, false, false>;
  "maxValue": $.PropertyDesc<_std.$float64, $.Cardinality.AtMostOne, false, false, false, false>;
  "minLength": $.PropertyDesc<_default.$nonNegative, $.Cardinality.AtMostOne, false, false, false, false>;
  "minValue": $.PropertyDesc<_std.$float64, $.Cardinality.AtMostOne, false, false, false, false>;
  "pattern": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "patternMsg": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "patternReplacement": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "placeHolder": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "spinStep": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "isExcludeInsert": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "isExcludeSelect": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "isExcludeUpdate": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "isMultiSelect": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "isSelfReference": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "isSetBySys": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "toggleValueFalse": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "toggleValueTrue": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "toggleValueShow": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
  "<columns[is sys_db::SysTable]": $.LinkDesc<$SysTable, $.Cardinality.Many, {}, false, false,  false, false>;
  "<column[is sys_core::SysDataObjFieldLinkJoin]": $.LinkDesc<_sys_core.$SysDataObjFieldLinkJoin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<columnsDisplay[is sys_core::SysDataObjFieldLink]": $.LinkDesc<_sys_core.$SysDataObjFieldLink, $.Cardinality.Many, {}, false, false,  false, false>;
  "<columnParent[is sys_core::SysDataObjTable]": $.LinkDesc<_sys_core.$SysDataObjTable, $.Cardinality.Many, {}, false, false,  false, false>;
  "<column[is sys_core::SysDataObjColumn]": $.LinkDesc<_sys_core.$SysDataObjColumn, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parentColumn[is sys_core::SysDataObj]": $.LinkDesc<_sys_core.$SysDataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<column": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<columnParent": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<columns": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<columnsDisplay": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parentColumn": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $SysColumn = $.ObjectType<"sys_db::SysColumn", $SysColumnλShape, null, [
  ..._sys_core.$SysObj['__exclusives__'],
]>;
const $SysColumn = $.makeType<$SysColumn>(_.spec, "5055903f-b3c2-11ee-8113-93f3d17dc30d", _.syntax.literal);

const SysColumn: $.$expr_PathNode<$.TypeSet<$SysColumn, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SysColumn, $.Cardinality.Many), null);

export type $SysTableλShape = $.typeutil.flatten<_sys_core.$SysObjλShape & {
  "columns": $.LinkDesc<$SysColumn, $.Cardinality.Many, {}, false, false,  false, false>;
  "hasMgmt": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, false>;
  "mod": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "<table[is sys_core::SysDataObjFieldLinkJoin]": $.LinkDesc<_sys_core.$SysDataObjFieldLinkJoin, $.Cardinality.Many, {}, false, false,  false, false>;
  "<table[is sys_core::SysDataObjTable]": $.LinkDesc<_sys_core.$SysDataObjTable, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parentTable[is sys_core::SysDataObj]": $.LinkDesc<_sys_core.$SysDataObj, $.Cardinality.Many, {}, false, false,  false, false>;
  "<parentTable": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<table": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $SysTable = $.ObjectType<"sys_db::SysTable", $SysTableλShape, null, [
  ..._sys_core.$SysObj['__exclusives__'],
]>;
const $SysTable = $.makeType<$SysTable>(_.spec, "505b5fa3-b3c2-11ee-8d9a-c1d6ad5b51e4", _.syntax.literal);

const SysTable: $.$expr_PathNode<$.TypeSet<$SysTable, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($SysTable, $.Cardinality.Many), null);

type getColumnλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $SysColumn, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getColumn<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  columnName: P1,
): getColumnλFuncExpr<P1>;
function getColumn(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_db::getColumn', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "5055903f-b3c2-11ee-8113-93f3d17dc30d", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_db::getColumn",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};

type getTableλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $SysTable, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getTable<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  tableName: P1,
): getTableλFuncExpr<P1>;
function getTable(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('sys_db::getTable', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "505b5fa3-b3c2-11ee-8d9a-c1d6ad5b51e4", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "sys_db::getTable",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { $SysColumn, SysColumn, $SysTable, SysTable };

type __defaultExports = {
  "SysColumn": typeof SysColumn;
  "SysTable": typeof SysTable;
  "getColumn": typeof getColumn;
  "getTable": typeof getTable
};
const __defaultExports: __defaultExports = {
  "SysColumn": SysColumn,
  "SysTable": SysTable,
  "getColumn": getColumn,
  "getTable": getTable
};
export default __defaultExports;
