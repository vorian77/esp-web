// GENERATED by @edgedb/generate v0.4.1

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _sys_user from "./sys_user";
import type * as _sys_core from "./sys_core";
import type * as _default from "./default";
import type * as _std from "./std";
import type * as _cal from "./cal";
export type $CmClientλShape = $.typeutil.flatten<_sys_user.$MgmtλShape & {
  "owner": $.LinkDesc<_sys_core.$SysOrg, $.Cardinality.One, {}, false, false,  false, false>;
  "person": $.LinkDesc<_default.$SysPerson, $.Cardinality.One, {}, false, false,  false, false>;
  "agencyId": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "school": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<client[is app_cm::CmClientServiceFlow]": $.LinkDesc<$CmClientServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<client": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmClient = $.ObjectType<"app_cm::CmClient", $CmClientλShape, null, [
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $CmClient = $.makeType<$CmClient>(_.spec, "508d4869-b3c2-11ee-ac7f-9da0574a2000", _.syntax.literal);

const CmClient: $.$expr_PathNode<$.TypeSet<$CmClient, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmClient, $.Cardinality.Many), null);

export type $CmClientServiceFlowλShape = $.typeutil.flatten<_sys_user.$MgmtλShape & {
  "client": $.LinkDesc<$CmClient, $.Cardinality.One, {}, false, false,  false, false>;
  "codeStatus": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "serviceFlow": $.LinkDesc<$CmServiceFlow, $.Cardinality.One, {}, false, false,  false, false>;
  "dateEnd": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateEndEst": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateReferral": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "dateStart": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateStartEst": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "<csf[is app_cm::CmCsfData]": $.LinkDesc<$CmCsfData, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csf[is app_cm::CmCsfNote]": $.LinkDesc<$CmCsfNote, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csf[is app_cm::CmCsfCohort]": $.LinkDesc<$CmCsfCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csf[is app_cm::CmCsfJobPlacement]": $.LinkDesc<$CmCsfJobPlacement, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csf[is app_cm::CmCsfDocument]": $.LinkDesc<$CmCsfDocument, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csf": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmClientServiceFlow = $.ObjectType<"app_cm::CmClientServiceFlow", $CmClientServiceFlowλShape, null, [
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $CmClientServiceFlow = $.makeType<$CmClientServiceFlow>(_.spec, "509285f9-b3c2-11ee-a00e-756d63ec4974", _.syntax.literal);

const CmClientServiceFlow: $.$expr_PathNode<$.TypeSet<$CmClientServiceFlow, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmClientServiceFlow, $.Cardinality.Many), null);

export type $CmCohortλShape = $.typeutil.flatten<_sys_core.$SysObjλShape & {
  "codeStatus": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "course": $.LinkDesc<$CmCourse, $.Cardinality.One, {}, false, false,  false, false>;
  "staffAdmin": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "staffAgency": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "staffInstructor": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "venue": $.LinkDesc<_sys_core.$SysOrg, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "capacity": $.PropertyDesc<_std.$int16, $.Cardinality.AtMostOne, false, false, false, false>;
  "isCohortRequired": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "schedule": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateEnd": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateStart": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "cost": $.PropertyDesc<_std.$float32, $.Cardinality.AtMostOne, false, false, false, false>;
  "<cohort[is app_cm::CmCsfCohort]": $.LinkDesc<$CmCsfCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<cohort": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmCohort = $.ObjectType<"app_cm::CmCohort", $CmCohortλShape, null, [
  ..._sys_core.$SysObj['__exclusives__'],
]>;
const $CmCohort = $.makeType<$CmCohort>(_.spec, "509b252e-b3c2-11ee-99e6-5fb46611bb4f", _.syntax.literal);

const CmCohort: $.$expr_PathNode<$.TypeSet<$CmCohort, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCohort, $.Cardinality.Many), null);

export type $CmCourseλShape = $.typeutil.flatten<_sys_core.$SysObjλShape & {
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "schedule": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeMultiCerts": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "codeMultiExams": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "codeMultiItemsIncluded": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "codeMultiItemsNotIncluded": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "codeMultiRqmts": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.Many, {}, false, false,  false, false>;
  "codeSector": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeStatus": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "codeTypePayment": $.LinkDesc<_sys_core.$SysCodeType, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "provider": $.LinkDesc<_sys_core.$SysOrg, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "staffAdmin": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "staffAgency": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "<course[is app_cm::CmCohort]": $.LinkDesc<$CmCohort, $.Cardinality.Many, {}, false, false,  false, false>;
  "<course": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmCourse = $.ObjectType<"app_cm::CmCourse", $CmCourseλShape, null, [
  ..._sys_core.$SysObj['__exclusives__'],
]>;
const $CmCourse = $.makeType<$CmCourse>(_.spec, "502e1460-b3c2-11ee-8c3e-7d1ed44df7ee", _.syntax.literal);

const CmCourse: $.$expr_PathNode<$.TypeSet<$CmCourse, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCourse, $.Cardinality.Many), null);

export type $CmCsfDataλShape = $.typeutil.flatten<_sys_user.$MgmtλShape & {
  "csf": $.LinkDesc<$CmClientServiceFlow, $.Cardinality.One, {}, false, false,  false, false>;
}>;
type $CmCsfData = $.ObjectType<"app_cm::CmCsfData", $CmCsfDataλShape, null, [
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $CmCsfData = $.makeType<$CmCsfData>(_.spec, "5095b7af-b3c2-11ee-89eb-0347bc6da7fe", _.syntax.literal);

const CmCsfData: $.$expr_PathNode<$.TypeSet<$CmCsfData, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfData, $.Cardinality.Many), null);

export type $CmCsfCohortλShape = $.typeutil.flatten<$CmCsfDataλShape & {
  "cohort": $.LinkDesc<$CmCohort, $.Cardinality.One, {}, false, false,  false, false>;
  "codeStatus": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "dateEnd": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateReferral": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateStart": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateEndEst": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateStartEst": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "<csfCohort[is app_cm::CmCsfCohortAttd]": $.LinkDesc<$CmCsfCohortAttd, $.Cardinality.Many, {}, false, false,  false, false>;
  "<csfCohort": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmCsfCohort = $.ObjectType<"app_cm::CmCsfCohort", $CmCsfCohortλShape, null, [
  ...$CmCsfData['__exclusives__'],
]>;
const $CmCsfCohort = $.makeType<$CmCsfCohort>(_.spec, "509f841a-b3c2-11ee-bb5b-5fe85e64db1c", _.syntax.literal);

const CmCsfCohort: $.$expr_PathNode<$.TypeSet<$CmCsfCohort, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfCohort, $.Cardinality.Many), null);

export type $CmCsfCohortAttdλShape = $.typeutil.flatten<_sys_user.$MgmtλShape & {
  "csfCohort": $.LinkDesc<$CmCsfCohort, $.Cardinality.One, {}, false, false,  false, false>;
  "date": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "duration": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $CmCsfCohortAttd = $.ObjectType<"app_cm::CmCsfCohortAttd", $CmCsfCohortAttdλShape, null, [
  ..._sys_user.$Mgmt['__exclusives__'],
]>;
const $CmCsfCohortAttd = $.makeType<$CmCsfCohortAttd>(_.spec, "50a81180-b3c2-11ee-beb2-fd3a6297eed9", _.syntax.literal);

const CmCsfCohortAttd: $.$expr_PathNode<$.TypeSet<$CmCsfCohortAttd, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfCohortAttd, $.Cardinality.Many), null);

export type $CmCsfDocumentλShape = $.typeutil.flatten<$CmCsfDataλShape & {
  "codeType": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "staffAgency": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.One, {}, false, false,  false, false>;
  "dateExpires": $.PropertyDesc<_cal.$local_date, $.Cardinality.AtMostOne, false, false, false, false>;
  "dateIssued": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "file": $.PropertyDesc<_std.$json, $.Cardinality.AtMostOne, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "isShareWithClient": $.PropertyDesc<_std.$bool, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $CmCsfDocument = $.ObjectType<"app_cm::CmCsfDocument", $CmCsfDocumentλShape, null, [
  ...$CmCsfData['__exclusives__'],
]>;
const $CmCsfDocument = $.makeType<$CmCsfDocument>(_.spec, "83671dfe-c9e6-11ee-b733-11d9576c877b", _.syntax.literal);

const CmCsfDocument: $.$expr_PathNode<$.TypeSet<$CmCsfDocument, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfDocument, $.Cardinality.Many), null);

export type $CmCsfJobPlacementλShape = $.typeutil.flatten<$CmCsfDataλShape & {
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "codeJobType": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "codePlacementRelated": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "codeWageType": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "employer": $.LinkDesc<$CmEmployer, $.Cardinality.One, {}, false, false,  false, false>;
  "staffAgency": $.LinkDesc<_sys_user.$SysStaff, $.Cardinality.One, {}, false, false,  false, false>;
  "dateStart": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "dateSubmitted": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "hoursPerWeek": $.PropertyDesc<_std.$float32, $.Cardinality.One, false, false, false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "wage": $.PropertyDesc<_std.$float32, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $CmCsfJobPlacement = $.ObjectType<"app_cm::CmCsfJobPlacement", $CmCsfJobPlacementλShape, null, [
  ...$CmCsfData['__exclusives__'],
]>;
const $CmCsfJobPlacement = $.makeType<$CmCsfJobPlacement>(_.spec, "c00e457a-c4ef-11ee-a08f-27c7dc3e85df", _.syntax.literal);

const CmCsfJobPlacement: $.$expr_PathNode<$.TypeSet<$CmCsfJobPlacement, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfJobPlacement, $.Cardinality.Many), null);

export type $CmCsfNoteλShape = $.typeutil.flatten<$CmCsfDataλShape & {
  "codeType": $.LinkDesc<_sys_core.$SysCode, $.Cardinality.One, {}, false, false,  false, false>;
  "date": $.PropertyDesc<_cal.$local_date, $.Cardinality.One, false, false, false, false>;
  "note": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
}>;
type $CmCsfNote = $.ObjectType<"app_cm::CmCsfNote", $CmCsfNoteλShape, null, [
  ...$CmCsfData['__exclusives__'],
]>;
const $CmCsfNote = $.makeType<$CmCsfNote>(_.spec, "50a2cd1e-b3c2-11ee-a2d3-dfa0c986c7fb", _.syntax.literal);

const CmCsfNote: $.$expr_PathNode<$.TypeSet<$CmCsfNote, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmCsfNote, $.Cardinality.Many), null);

export type $CmEmployerλShape = $.typeutil.flatten<_sys_core.$SysOrgλShape & {
  "contact": $.LinkDesc<_default.$SysPerson, $.Cardinality.AtMostOne, {}, false, false,  false, false>;
  "<employer[is app_cm::CmCsfJobPlacement]": $.LinkDesc<$CmCsfJobPlacement, $.Cardinality.Many, {}, false, false,  false, false>;
  "<employer": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmEmployer = $.ObjectType<"app_cm::CmEmployer", $CmEmployerλShape, null, [
  ..._sys_core.$SysOrg['__exclusives__'],
]>;
const $CmEmployer = $.makeType<$CmEmployer>(_.spec, "8310b592-c4fb-11ee-bfaa-419449ccb0f3", _.syntax.literal);

const CmEmployer: $.$expr_PathNode<$.TypeSet<$CmEmployer, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmEmployer, $.Cardinality.Many), null);

export type $CmServiceFlowλShape = $.typeutil.flatten<_sys_core.$SysObjλShape & {
  "<serviceFlow[is app_cm::CmClientServiceFlow]": $.LinkDesc<$CmClientServiceFlow, $.Cardinality.Many, {}, false, false,  false, false>;
  "<serviceFlow": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $CmServiceFlow = $.ObjectType<"app_cm::CmServiceFlow", $CmServiceFlowλShape, null, [
  ..._sys_core.$SysObj['__exclusives__'],
]>;
const $CmServiceFlow = $.makeType<$CmServiceFlow>(_.spec, "508fd862-b3c2-11ee-b53c-adb735a878bb", _.syntax.literal);

const CmServiceFlow: $.$expr_PathNode<$.TypeSet<$CmServiceFlow, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($CmServiceFlow, $.Cardinality.Many), null);

type getCMTrainingCourseλFuncExpr<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
> = $.$expr_Function<
  $CmCourse, $.cardutil.overrideLowerBound<$.cardutil.paramCardinality<P1>, 'Zero'>
>;
function getCMTrainingCourse<
  P1 extends _.castMaps.orScalarLiteral<$.TypeSet<_std.$str>>,
>(
  name: P1,
): getCMTrainingCourseλFuncExpr<P1>;
function getCMTrainingCourse(...args: any[]) {
  const {returnType, cardinality, args: positionalArgs, namedArgs} = _.syntax.$resolveOverload('app_cm::getCMTrainingCourse', args, _.spec, [
    {args: [{typeId: "00000000-0000-0000-0000-000000000101", optional: false, setoftype: false, variadic: false}], returnTypeId: "502e1460-b3c2-11ee-8c3e-7d1ed44df7ee", returnTypemod: "OptionalType"},
  ]);
  return _.syntax.$expressionify({
    __kind__: $.ExpressionKind.Function,
    __element__: returnType,
    __cardinality__: cardinality,
    __name__: "app_cm::getCMTrainingCourse",
    __args__: positionalArgs,
    __namedargs__: namedArgs,
  }) as any;
};



export { $CmClient, CmClient, $CmClientServiceFlow, CmClientServiceFlow, $CmCohort, CmCohort, $CmCourse, CmCourse, $CmCsfData, CmCsfData, $CmCsfCohort, CmCsfCohort, $CmCsfCohortAttd, CmCsfCohortAttd, $CmCsfDocument, CmCsfDocument, $CmCsfJobPlacement, CmCsfJobPlacement, $CmCsfNote, CmCsfNote, $CmEmployer, CmEmployer, $CmServiceFlow, CmServiceFlow };

type __defaultExports = {
  "CmClient": typeof CmClient;
  "CmClientServiceFlow": typeof CmClientServiceFlow;
  "CmCohort": typeof CmCohort;
  "CmCourse": typeof CmCourse;
  "CmCsfData": typeof CmCsfData;
  "CmCsfCohort": typeof CmCsfCohort;
  "CmCsfCohortAttd": typeof CmCsfCohortAttd;
  "CmCsfDocument": typeof CmCsfDocument;
  "CmCsfJobPlacement": typeof CmCsfJobPlacement;
  "CmCsfNote": typeof CmCsfNote;
  "CmEmployer": typeof CmEmployer;
  "CmServiceFlow": typeof CmServiceFlow;
  "getCMTrainingCourse": typeof getCMTrainingCourse
};
const __defaultExports: __defaultExports = {
  "CmClient": CmClient,
  "CmClientServiceFlow": CmClientServiceFlow,
  "CmCohort": CmCohort,
  "CmCourse": CmCourse,
  "CmCsfData": CmCsfData,
  "CmCsfCohort": CmCsfCohort,
  "CmCsfCohortAttd": CmCsfCohortAttd,
  "CmCsfDocument": CmCsfDocument,
  "CmCsfJobPlacement": CmCsfJobPlacement,
  "CmCsfNote": CmCsfNote,
  "CmEmployer": CmEmployer,
  "CmServiceFlow": CmServiceFlow,
  "getCMTrainingCourse": getCMTrainingCourse
};
export default __defaultExports;
