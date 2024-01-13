// GENERATED by @edgedb/generate v0.4.1

import type * as edgedb from "edgedb";
export namespace std {
  export interface BaseObject {
    "id": string;
  }
  export interface $Object extends BaseObject {}
  export interface FreeObject extends BaseObject {}
  export type JsonEmpty = "ReturnEmpty" | "ReturnTarget" | "Error" | "UseNull" | "DeleteKey";
  export namespace enc {
    export type Base64Alphabet = "standard" | "urlsafe";
  }
}
export namespace sys_user {
  export interface Mgmt extends std.$Object {
    "createdAt": Date;
    "modifiedAt"?: Date | null;
    "createdBy": UserRoot;
    "modifiedBy": UserRoot;
  }
  export interface UserRoot extends std.$Object {
    "userName": string;
    "person": SysPerson;
  }
  export interface SysUser extends UserRoot, Mgmt {
    "orgs": sys_core.SysOrg[];
    "owner": sys_core.SysOrg;
    "userTypes": SysUserType[];
    "password": string;
  }
  export interface SYS_USER extends SysUser {}
  export interface SYS_USER_ID extends SysUser {}
  export interface SysStaff extends Mgmt {
    "person": SysPerson;
    "roles": sys_core.SysCode[];
    "owner": sys_core.SysOrg;
  }
  export interface SysUserType extends sys_core.SysObj {
    "resources": sys_core.SysObj[];
  }
  export interface SysWidget extends sys_core.SysObj {}
  export interface currentUser extends SysUser {}
}
export namespace app_cm {
  export interface CmClient extends sys_user.Mgmt {
    "owner": sys_core.SysOrg;
    "person": SysPerson;
    "agencyId"?: string | null;
  }
  export interface CmClientServiceFlow extends sys_user.Mgmt {
    "client": CmClient;
    "codeStatus": sys_core.SysCode;
    "serviceFlow": CmServiceFlow;
    "dateEnd"?: edgedb.LocalDate | null;
    "dateEndEst"?: edgedb.LocalDate | null;
    "dateReferral": edgedb.LocalDate;
    "dateStart"?: edgedb.LocalDate | null;
    "dateStartEst"?: edgedb.LocalDate | null;
    "note"?: string | null;
  }
  export interface CmCohort extends sys_core.SysObj {
    "codeStatus"?: sys_core.SysCode | null;
    "course": CmCourse;
    "staffAdmin"?: sys_user.SysStaff | null;
    "staffAgency"?: sys_user.SysStaff | null;
    "staffInstructor"?: sys_user.SysStaff | null;
    "venue"?: sys_core.SysOrg | null;
    "capacity"?: number | null;
    "isCohortRequired"?: string | null;
    "note"?: string | null;
    "schedule"?: string | null;
  }
  export interface CmCourse extends sys_core.SysObj {
    "cost"?: number | null;
    "description"?: string | null;
    "schedule"?: string | null;
    "codeMultiCerts": sys_core.SysCode[];
    "codeMultiExams": sys_core.SysCode[];
    "codeMultiItemsIncluded": sys_core.SysCode[];
    "codeMultiItemsNotIncluded": sys_core.SysCode[];
    "codeMultiRqmts": sys_core.SysCode[];
    "codeSector"?: sys_core.SysCode | null;
    "codeStatus"?: sys_core.SysCode | null;
    "codeTypePayment"?: sys_core.SysCodeType | null;
    "provider"?: sys_core.SysOrg | null;
    "staffAdmin"?: sys_user.SysStaff | null;
    "staffAgency"?: sys_user.SysStaff | null;
  }
  export interface CmCsfData extends sys_user.Mgmt {
    "clientServiceFlow": CmClientServiceFlow;
  }
  export interface CmCsfCertification extends CmCsfData {
    "course": CmCourse;
    "codeCertification": sys_core.SysCode;
    "staffAgency": sys_user.SysStaff;
    "dateExpires"?: edgedb.LocalDate | null;
    "dateIssued": edgedb.LocalDate;
    "imageCertification"?: unknown | null;
    "note"?: string | null;
  }
  export interface CmCsfCohort extends CmCsfData {
    "cohort": CmCohort;
    "codeMultiCerts": sys_core.SysCode[];
    "codeStatus": sys_core.SysCode;
    "dateEnd"?: edgedb.LocalDate | null;
    "dateReferral"?: edgedb.LocalDate | null;
    "dateStart"?: edgedb.LocalDate | null;
    "note"?: string | null;
  }
  export interface CmCsfCohortAttd extends sys_user.Mgmt {
    "csfCohort": CmCsfCohort;
    "date": edgedb.LocalDate;
    "duration": number;
    "note"?: string | null;
  }
  export interface CmCsfNote extends CmCsfData {
    "codeType": sys_core.SysCode;
    "date": edgedb.LocalDate;
    "note"?: string | null;
  }
  export interface CmServiceFlow extends sys_core.SysObj {}
}
export namespace sys_core {
  export interface ObjRoot extends std.$Object {
    "header"?: string | null;
    "name": string;
  }
  export interface SysObj extends ObjRoot, sys_user.Mgmt {
    "owner": ObjRoot;
  }
  export interface SysEnt extends SysObj {
    "roles": SysCode[];
  }
  export interface SysApp extends SysEnt {}
  export interface SysCode extends SysObj {
    "parent"?: SysCode | null;
    "order": number;
    "valueDecimal"?: string | null;
    "valueInteger"?: number | null;
    "valueString"?: string | null;
    "codeType": SysCodeType;
  }
  export interface SysCodeType extends SysObj {
    "parent"?: SysCodeType | null;
    "order": number;
  }
  export interface SysDataObj extends SysObj {
    "codeCardinality": SysCode;
    "codeComponent": SysCode;
    "description"?: string | null;
    "exprFilter"?: string | null;
    "exprObject"?: string | null;
    "isPopup"?: boolean | null;
    "link"?: unknown | null;
    "subHeader"?: string | null;
    "actions": SysDataObjAction[];
    "fieldsDb": SysDataObjFieldDb[];
    "fieldsEl": SysDataObjFieldEl[];
    "table"?: sys_db.SysTable | null;
  }
  export interface SysDataObjAction extends SysObj {
    "allTabs"?: boolean | null;
    "color"?: string | null;
    "order": number;
  }
  export interface SysDataObjFieldDb extends std.$Object {
    "codeDbDataOp"?: SysCode | null;
    "codeDbDataSource"?: SysCode | null;
    "codeDbListDir"?: SysCode | null;
    "column": sys_db.SysColumn;
    "dbDataSourceKey"?: string | null;
    "dbOrderList"?: number | null;
    "exprFilter"?: string | null;
    "exprPreset"?: string | null;
    "fieldName"?: string | null;
    "isDbAllowNull"?: boolean | null;
    "isDbFilter"?: boolean | null;
    "isLinkMember"?: boolean | null;
  }
  export interface SysDataObjFieldEl extends std.$Object {
    "codeAccess"?: SysCode | null;
    "codeElement"?: SysCode | null;
    "column": sys_db.SysColumn;
    "itemsList"?: SysDataObjFieldItems | null;
    "customElement"?: unknown | null;
    "dbOrderCrumb"?: number | null;
    "dbOrderSelect"?: number | null;
    "headerAlt"?: string | null;
    "height"?: number | null;
    "isDisplay"?: boolean | null;
    "isDisplayable"?: boolean | null;
    "items"?: unknown[] | null;
    "itemsListParms"?: unknown | null;
    "width"?: number | null;
  }
  export interface SysDataObjFieldItems extends SysObj {
    "dbSelect": string;
    "propertyId": string;
    "propertyLabel": string;
    "fieldsDb": SysDataObjFieldDb[];
  }
  export interface SysNodeObj extends SysObj {
    "codeIcon": SysCode;
    "codeType": SysCode;
    "dataObj"?: SysDataObj | null;
    "parent"?: SysNodeObj | null;
    "order": number;
    "page"?: string | null;
    "queryActions"?: unknown[] | null;
  }
  export interface SysNodeObjFooter extends SysNodeObj {}
  export interface SysOrg extends SysEnt {
    "state"?: SysCodeType | null;
    "addr1"?: string | null;
    "addr2"?: string | null;
    "city"?: string | null;
    "zip"?: string | null;
  }
}
export interface SysPerson extends std.$Object {
  "firstName": string;
  "lastName": string;
  "codeEthnicity"?: sys_core.SysCode | null;
  "codeGender"?: sys_core.SysCode | null;
  "codeRace"?: sys_core.SysCode | null;
  "codeState"?: sys_core.SysCode | null;
  "addr1"?: string | null;
  "addr2"?: string | null;
  "avatar"?: unknown | null;
  "birthDate"?: edgedb.LocalDate | null;
  "city"?: string | null;
  "email"?: string | null;
  "favFood"?: string | null;
  "fullName": string;
  "note"?: string | null;
  "phoneMobile"?: string | null;
  "zip"?: string | null;
}
export namespace cfg {
  export interface ConfigObject extends std.BaseObject {}
  export interface AbstractConfig extends ConfigObject {
    "extensions": ExtensionConfig[];
    "session_idle_timeout": edgedb.Duration;
    "session_idle_transaction_timeout": edgedb.Duration;
    "query_execution_timeout": edgedb.Duration;
    "listen_port": number;
    "listen_addresses": string[];
    "auth": Auth[];
    "allow_dml_in_functions"?: boolean | null;
    "allow_bare_ddl"?: AllowBareDDL | null;
    "apply_access_policies"?: boolean | null;
    "allow_user_specified_id"?: boolean | null;
    "shared_buffers"?: edgedb.ConfigMemory | null;
    "query_work_mem"?: edgedb.ConfigMemory | null;
    "maintenance_work_mem"?: edgedb.ConfigMemory | null;
    "effective_cache_size"?: edgedb.ConfigMemory | null;
    "effective_io_concurrency"?: number | null;
    "default_statistics_target"?: number | null;
    "force_database_error"?: string | null;
    "_pg_prepared_statement_cache_size": number;
  }
  export type AllowBareDDL = "AlwaysAllow" | "NeverAllow";
  export interface Auth extends ConfigObject {
    "priority": number;
    "user": string[];
    "method"?: AuthMethod | null;
    "comment"?: string | null;
  }
  export interface AuthMethod extends ConfigObject {
    "transports": ConnectionTransport[];
  }
  export interface Config extends AbstractConfig {}
  export type ConnectionTransport = "TCP" | "TCP_PG" | "HTTP" | "SIMPLE_HTTP";
  export interface DatabaseConfig extends AbstractConfig {}
  export interface ExtensionConfig extends ConfigObject {
    "cfg": AbstractConfig;
  }
  export interface InstanceConfig extends AbstractConfig {}
  export interface JWT extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Password extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface SCRAM extends AuthMethod {
    "transports": ConnectionTransport[];
  }
  export interface Trust extends AuthMethod {}
}
export namespace fts {
  export type ElasticLanguage = "ara" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tha" | "tur" | "zho" | "edb_Brazilian" | "edb_ChineseJapaneseKorean";
  export type Language = "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "nor" | "por" | "ron" | "rus" | "spa" | "swe" | "tur";
  export type LuceneLanguage = "ara" | "ben" | "bul" | "cat" | "ces" | "ckb" | "dan" | "deu" | "ell" | "eng" | "est" | "eus" | "fas" | "fin" | "fra" | "gle" | "glg" | "hin" | "hun" | "hye" | "ind" | "ita" | "lav" | "lit" | "nld" | "nor" | "por" | "ron" | "rus" | "spa" | "srp" | "swe" | "tha" | "tur" | "edb_Brazilian" | "edb_ChineseJapaneseKorean" | "edb_Indian";
  export type PGLanguage = "xxx_simple" | "ara" | "hye" | "eus" | "cat" | "dan" | "nld" | "eng" | "fin" | "fra" | "deu" | "ell" | "hin" | "hun" | "ind" | "gle" | "ita" | "lit" | "npi" | "nor" | "por" | "ron" | "rus" | "srp" | "spa" | "swe" | "tam" | "tur" | "yid";
  export type Weight = "A" | "B" | "C" | "D";
}
export namespace schema {
  export type AccessKind = "Select" | "UpdateRead" | "UpdateWrite" | "Delete" | "Insert";
  export interface $Object extends std.BaseObject {
    "name": string;
    "internal": boolean;
    "builtin": boolean;
    "computed_fields"?: string[] | null;
  }
  export interface SubclassableObject extends $Object {
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
    "final": boolean;
    "is_final": boolean;
  }
  export interface InheritingObject extends SubclassableObject {
    "bases": InheritingObject[];
    "ancestors": InheritingObject[];
    "inherited_fields"?: string[] | null;
  }
  export interface AnnotationSubject extends $Object {
    "annotations": Annotation[];
  }
  export interface AccessPolicy extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "access_kinds": AccessKind[];
    "condition"?: string | null;
    "action": AccessPolicyAction;
    "expr"?: string | null;
    "errmessage"?: string | null;
  }
  export type AccessPolicyAction = "Allow" | "Deny";
  export interface Alias extends AnnotationSubject {
    "expr": string;
    "type"?: Type | null;
  }
  export interface Annotation extends InheritingObject, AnnotationSubject {
    "inheritable"?: boolean | null;
  }
  export interface Type extends SubclassableObject, AnnotationSubject {
    "expr"?: string | null;
    "from_alias"?: boolean | null;
    "is_from_alias"?: boolean | null;
  }
  export interface PrimitiveType extends Type {}
  export interface CollectionType extends PrimitiveType {}
  export interface Array extends CollectionType {
    "element_type": Type;
    "dimensions"?: number[] | null;
  }
  export interface ArrayExprAlias extends Array {}
  export interface CallableObject extends AnnotationSubject {
    "params": Parameter[];
    "return_type"?: Type | null;
    "return_typemod"?: TypeModifier | null;
  }
  export type Cardinality = "One" | "Many";
  export interface VolatilitySubject extends $Object {
    "volatility"?: Volatility | null;
  }
  export interface Cast extends AnnotationSubject, VolatilitySubject {
    "from_type"?: Type | null;
    "to_type"?: Type | null;
    "allow_implicit"?: boolean | null;
    "allow_assignment"?: boolean | null;
  }
  export interface ConsistencySubject extends InheritingObject, AnnotationSubject {
    "constraints": Constraint[];
  }
  export interface Constraint extends CallableObject, InheritingObject {
    "params": Parameter[];
    "expr"?: string | null;
    "subjectexpr"?: string | null;
    "finalexpr"?: string | null;
    "errmessage"?: string | null;
    "delegated"?: boolean | null;
    "except_expr"?: string | null;
    "subject"?: ConsistencySubject | null;
  }
  export interface Delta extends $Object {
    "parents": Delta[];
  }
  export interface Extension extends AnnotationSubject, $Object {
    "package": sys.ExtensionPackage;
  }
  export interface Function extends CallableObject, VolatilitySubject {
    "preserves_optionality"?: boolean | null;
    "body"?: string | null;
    "language": string;
    "used_globals": Global[];
  }
  export interface FutureBehavior extends $Object {}
  export interface Global extends AnnotationSubject {
    "target"?: Type | null;
    "required"?: boolean | null;
    "cardinality"?: Cardinality | null;
    "expr"?: string | null;
    "default"?: string | null;
  }
  export interface Index extends InheritingObject, AnnotationSubject {
    "expr"?: string | null;
    "except_expr"?: string | null;
    "params": Parameter[];
    "kwargs"?: {name: string, expr: string}[] | null;
  }
  export interface Pointer extends ConsistencySubject, AnnotationSubject {
    "cardinality"?: Cardinality | null;
    "required"?: boolean | null;
    "readonly"?: boolean | null;
    "default"?: string | null;
    "expr"?: string | null;
    "source"?: Source | null;
    "target"?: Type | null;
    "rewrites": Rewrite[];
  }
  export interface Source extends $Object {
    "indexes": Index[];
    "pointers": Pointer[];
  }
  export interface Link extends Pointer, Source {
    "target"?: ObjectType | null;
    "properties": Property[];
    "on_target_delete"?: TargetDeleteAction | null;
    "on_source_delete"?: SourceDeleteAction | null;
  }
  export interface Migration extends AnnotationSubject, $Object {
    "parents": Migration[];
    "script": string;
    "message"?: string | null;
    "generated_by"?: MigrationGeneratedBy | null;
  }
  export type MigrationGeneratedBy = "DevMode" | "DDLStatement";
  export interface Module extends AnnotationSubject, $Object {}
  export interface MultiRange extends CollectionType {
    "element_type": Type;
  }
  export interface MultiRangeExprAlias extends MultiRange {}
  export interface ObjectType extends Source, ConsistencySubject, InheritingObject, Type, AnnotationSubject {
    "union_of": ObjectType[];
    "intersection_of": ObjectType[];
    "access_policies": AccessPolicy[];
    "triggers": Trigger[];
    "compound_type": boolean;
    "is_compound_type": boolean;
    "links": Link[];
    "properties": Property[];
  }
  export interface Operator extends CallableObject, VolatilitySubject {
    "operator_kind"?: OperatorKind | null;
    "abstract"?: boolean | null;
    "is_abstract"?: boolean | null;
  }
  export type OperatorKind = "Infix" | "Postfix" | "Prefix" | "Ternary";
  export interface Parameter extends $Object {
    "type": Type;
    "typemod": TypeModifier;
    "kind": ParameterKind;
    "num": number;
    "default"?: string | null;
  }
  export type ParameterKind = "VariadicParam" | "NamedOnlyParam" | "PositionalParam";
  export interface Property extends Pointer {}
  export interface PseudoType extends InheritingObject, Type {}
  export interface Range extends CollectionType {
    "element_type": Type;
  }
  export interface RangeExprAlias extends Range {}
  export interface Rewrite extends InheritingObject, AnnotationSubject {
    "subject": Pointer;
    "kind": TriggerKind;
    "expr": string;
  }
  export type RewriteKind = "Update" | "Insert";
  export interface ScalarType extends PrimitiveType, ConsistencySubject, AnnotationSubject {
    "default"?: string | null;
    "enum_values"?: string[] | null;
    "arg_values"?: string[] | null;
  }
  export type SourceDeleteAction = "DeleteTarget" | "Allow" | "DeleteTargetIfOrphan";
  export type TargetDeleteAction = "Restrict" | "DeleteSource" | "Allow" | "DeferredRestrict";
  export interface Trigger extends InheritingObject, AnnotationSubject {
    "subject": ObjectType;
    "timing": TriggerTiming;
    "kinds": TriggerKind[];
    "scope": TriggerScope;
    "expr"?: string | null;
    "condition"?: string | null;
  }
  export type TriggerKind = "Update" | "Delete" | "Insert";
  export type TriggerScope = "All" | "Each";
  export type TriggerTiming = "After" | "AfterCommitOf";
  export interface Tuple extends CollectionType {
    "named": boolean;
    "element_types": TupleElement[];
  }
  export interface TupleElement extends std.BaseObject {
    "type": Type;
    "name"?: string | null;
  }
  export interface TupleExprAlias extends Tuple {}
  export type TypeModifier = "SetOfType" | "OptionalType" | "SingletonType";
  export type Volatility = "Immutable" | "Stable" | "Volatile";
}
export namespace sys {
  export interface SystemObject extends schema.$Object {}
  export interface ExternalObject extends SystemObject {}
  export interface Database extends ExternalObject, schema.AnnotationSubject {
    "name": string;
  }
  export interface ExtensionPackage extends SystemObject, schema.AnnotationSubject {
    "script": string;
    "version": {major: number, minor: number, stage: VersionStage, stage_no: number, local: string[]};
  }
  export interface Role extends SystemObject, schema.InheritingObject, schema.AnnotationSubject {
    "name": string;
    "superuser": boolean;
    "is_superuser": boolean;
    "password"?: string | null;
    "member_of": Role[];
  }
  export type TransactionIsolation = "RepeatableRead" | "Serializable";
  export type VersionStage = "dev" | "alpha" | "beta" | "rc" | "final";
}
export namespace sys_admin {
  export interface SaObjConfig extends sys_core.SysObj {
    "creator"?: string | null;
    "detailActions"?: string | null;
    "detailDataObj"?: string | null;
    "detailHeader"?: string | null;
    "detailName"?: string | null;
    "detailOrder"?: number | null;
    "detailParentNodeName"?: string | null;
    "detailSubHeader"?: string | null;
    "hasMgmt"?: boolean | null;
    "icon"?: string | null;
    "linkProperty"?: string | null;
    "linkTableModule"?: string | null;
    "linkTableName"?: string | null;
    "listActions"?: string | null;
    "listDataObj"?: string | null;
    "listExprFilter"?: string | null;
    "listHeader"?: string | null;
    "listName"?: string | null;
    "listOrder"?: number | null;
    "listParentNodeName"?: string | null;
    "listSubHeader"?: string | null;
    "objsOwner"?: string | null;
    "outputDetailColumns"?: string | null;
    "outputDetailDataObj"?: string | null;
    "outputDetailNode"?: string | null;
    "outputListColumns"?: string | null;
    "outputListDataObj"?: string | null;
    "outputListNode"?: string | null;
    "tableModule"?: string | null;
    "tableName"?: string | null;
    "tableOwner"?: string | null;
  }
}
export namespace sys_db {
  export interface SysColumn extends sys_core.SysObj {
    "codeAlignment"?: sys_core.SysCode | null;
    "codeDataType": sys_core.SysCode;
    "codeDataTypeComputed"?: sys_core.SysCode | null;
    "classValue"?: string | null;
    "edgeTypeDefn"?: unknown | null;
    "exprPreset"?: string | null;
    "exprSelect"?: string | null;
    "exprStorageKey"?: string | null;
    "headerSide"?: string | null;
    "isExcludeInsert"?: boolean | null;
    "isExcludeSelect"?: boolean | null;
    "isExcludeUpdate"?: boolean | null;
    "isMultiSelect"?: boolean | null;
    "isSetBySys"?: boolean | null;
    "matchColumn"?: string | null;
    "maxLength"?: number | null;
    "maxValue"?: number | null;
    "minLength"?: number | null;
    "minValue"?: number | null;
    "pattern"?: string | null;
    "patternMsg"?: string | null;
    "patternReplacement"?: string | null;
    "placeHolder"?: string | null;
    "spinStep"?: string | null;
  }
  export interface SysTable extends sys_core.SysObj {
    "columns": SysColumn[];
    "hasMgmt": boolean;
    "mod": string;
  }
}
export namespace sys_test {
  export interface Movie extends std.$Object {
    "actors": Person[];
    "title"?: string | null;
  }
  export interface Person extends std.$Object {
    "name": string;
  }
}
export interface types {
  "std": {
    "BaseObject": std.BaseObject;
    "Object": std.$Object;
    "FreeObject": std.FreeObject;
    "JsonEmpty": std.JsonEmpty;
    "enc": {
      "Base64Alphabet": std.enc.Base64Alphabet;
    };
  };
  "sys_user": {
    "Mgmt": sys_user.Mgmt;
    "UserRoot": sys_user.UserRoot;
    "SysUser": sys_user.SysUser;
    "SYS_USER": sys_user.SYS_USER;
    "SYS_USER_ID": sys_user.SYS_USER_ID;
    "SysStaff": sys_user.SysStaff;
    "SysUserType": sys_user.SysUserType;
    "SysWidget": sys_user.SysWidget;
    "currentUser": sys_user.currentUser;
  };
  "app_cm": {
    "CmClient": app_cm.CmClient;
    "CmClientServiceFlow": app_cm.CmClientServiceFlow;
    "CmCohort": app_cm.CmCohort;
    "CmCourse": app_cm.CmCourse;
    "CmCsfData": app_cm.CmCsfData;
    "CmCsfCertification": app_cm.CmCsfCertification;
    "CmCsfCohort": app_cm.CmCsfCohort;
    "CmCsfCohortAttd": app_cm.CmCsfCohortAttd;
    "CmCsfNote": app_cm.CmCsfNote;
    "CmServiceFlow": app_cm.CmServiceFlow;
  };
  "sys_core": {
    "ObjRoot": sys_core.ObjRoot;
    "SysObj": sys_core.SysObj;
    "SysEnt": sys_core.SysEnt;
    "SysApp": sys_core.SysApp;
    "SysCode": sys_core.SysCode;
    "SysCodeType": sys_core.SysCodeType;
    "SysDataObj": sys_core.SysDataObj;
    "SysDataObjAction": sys_core.SysDataObjAction;
    "SysDataObjFieldDb": sys_core.SysDataObjFieldDb;
    "SysDataObjFieldEl": sys_core.SysDataObjFieldEl;
    "SysDataObjFieldItems": sys_core.SysDataObjFieldItems;
    "SysNodeObj": sys_core.SysNodeObj;
    "SysNodeObjFooter": sys_core.SysNodeObjFooter;
    "SysOrg": sys_core.SysOrg;
  };
  "default": {
    "SysPerson": SysPerson;
  };
  "cfg": {
    "ConfigObject": cfg.ConfigObject;
    "AbstractConfig": cfg.AbstractConfig;
    "AllowBareDDL": cfg.AllowBareDDL;
    "Auth": cfg.Auth;
    "AuthMethod": cfg.AuthMethod;
    "Config": cfg.Config;
    "ConnectionTransport": cfg.ConnectionTransport;
    "DatabaseConfig": cfg.DatabaseConfig;
    "ExtensionConfig": cfg.ExtensionConfig;
    "InstanceConfig": cfg.InstanceConfig;
    "JWT": cfg.JWT;
    "Password": cfg.Password;
    "SCRAM": cfg.SCRAM;
    "Trust": cfg.Trust;
  };
  "fts": {
    "ElasticLanguage": fts.ElasticLanguage;
    "Language": fts.Language;
    "LuceneLanguage": fts.LuceneLanguage;
    "PGLanguage": fts.PGLanguage;
    "Weight": fts.Weight;
  };
  "schema": {
    "AccessKind": schema.AccessKind;
    "Object": schema.$Object;
    "SubclassableObject": schema.SubclassableObject;
    "InheritingObject": schema.InheritingObject;
    "AnnotationSubject": schema.AnnotationSubject;
    "AccessPolicy": schema.AccessPolicy;
    "AccessPolicyAction": schema.AccessPolicyAction;
    "Alias": schema.Alias;
    "Annotation": schema.Annotation;
    "Type": schema.Type;
    "PrimitiveType": schema.PrimitiveType;
    "CollectionType": schema.CollectionType;
    "Array": schema.Array;
    "ArrayExprAlias": schema.ArrayExprAlias;
    "CallableObject": schema.CallableObject;
    "Cardinality": schema.Cardinality;
    "VolatilitySubject": schema.VolatilitySubject;
    "Cast": schema.Cast;
    "ConsistencySubject": schema.ConsistencySubject;
    "Constraint": schema.Constraint;
    "Delta": schema.Delta;
    "Extension": schema.Extension;
    "Function": schema.Function;
    "FutureBehavior": schema.FutureBehavior;
    "Global": schema.Global;
    "Index": schema.Index;
    "Pointer": schema.Pointer;
    "Source": schema.Source;
    "Link": schema.Link;
    "Migration": schema.Migration;
    "MigrationGeneratedBy": schema.MigrationGeneratedBy;
    "Module": schema.Module;
    "MultiRange": schema.MultiRange;
    "MultiRangeExprAlias": schema.MultiRangeExprAlias;
    "ObjectType": schema.ObjectType;
    "Operator": schema.Operator;
    "OperatorKind": schema.OperatorKind;
    "Parameter": schema.Parameter;
    "ParameterKind": schema.ParameterKind;
    "Property": schema.Property;
    "PseudoType": schema.PseudoType;
    "Range": schema.Range;
    "RangeExprAlias": schema.RangeExprAlias;
    "Rewrite": schema.Rewrite;
    "RewriteKind": schema.RewriteKind;
    "ScalarType": schema.ScalarType;
    "SourceDeleteAction": schema.SourceDeleteAction;
    "TargetDeleteAction": schema.TargetDeleteAction;
    "Trigger": schema.Trigger;
    "TriggerKind": schema.TriggerKind;
    "TriggerScope": schema.TriggerScope;
    "TriggerTiming": schema.TriggerTiming;
    "Tuple": schema.Tuple;
    "TupleElement": schema.TupleElement;
    "TupleExprAlias": schema.TupleExprAlias;
    "TypeModifier": schema.TypeModifier;
    "Volatility": schema.Volatility;
  };
  "sys": {
    "SystemObject": sys.SystemObject;
    "ExternalObject": sys.ExternalObject;
    "Database": sys.Database;
    "ExtensionPackage": sys.ExtensionPackage;
    "Role": sys.Role;
    "TransactionIsolation": sys.TransactionIsolation;
    "VersionStage": sys.VersionStage;
  };
  "sys_admin": {
    "SaObjConfig": sys_admin.SaObjConfig;
  };
  "sys_db": {
    "SysColumn": sys_db.SysColumn;
    "SysTable": sys_db.SysTable;
  };
  "sys_test": {
    "Movie": sys_test.Movie;
    "Person": sys_test.Person;
  };
}


export namespace helper {
  type LinkType = std.BaseObject | std.BaseObject[];

  export type propertyKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? never : k;
  }[keyof T];

  export type linkKeys<T> = {
    [k in keyof T]: NonNullable<T[k]> extends LinkType ? k : never;
  }[keyof T];

  export type Props<T> = Pick<T, propertyKeys<T>>;
  export type Links<T> = Pick<T, linkKeys<T>>;
}
