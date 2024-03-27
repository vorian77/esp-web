CREATE MIGRATION m1ce7zh5dsazbqhb3ahmxs7wt6gqtdxahqeu2wehrlxpf5vb3lkh3a
    ONTO initial
{
  CREATE MODULE app_cm IF NOT EXISTS;
  CREATE MODULE sys_admin IF NOT EXISTS;
  CREATE MODULE sys_core IF NOT EXISTS;
  CREATE MODULE sys_db IF NOT EXISTS;
  CREATE MODULE sys_test IF NOT EXISTS;
  CREATE MODULE sys_user IF NOT EXISTS;
  CREATE TYPE sys_core::ObjRoot {
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE ABSTRACT TYPE sys_user::Mgmt {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE PROPERTY modifiedAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_transaction());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_transaction());
      };
  };
  CREATE ABSTRACT TYPE sys_core::SysObj EXTENDING sys_core::ObjRoot, sys_user::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::ObjRoot;
  };
  CREATE TYPE app_cm::CmCourse EXTENDING sys_core::SysObj {
      CREATE PROPERTY cost: std::float32;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY schedule: std::str;
  };
  CREATE FUNCTION app_cm::getCMTrainingCourse(name: std::str) -> OPTIONAL app_cm::CmCourse USING (SELECT
      std::assert_single((SELECT
          app_cm::CmCourse
      FILTER
          (.name = name)
      ))
  );
  CREATE SCALAR TYPE default::nonNegative EXTENDING std::int64 {
      CREATE CONSTRAINT std::min_value(0);
  };
  CREATE TYPE sys_core::SysCode EXTENDING sys_core::SysObj {
      CREATE LINK parent: sys_core::SysCode;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
      CREATE PROPERTY valueDecimal: std::decimal;
      CREATE PROPERTY valueInteger: std::int64;
      CREATE PROPERTY valueString: std::str;
  };
  CREATE TYPE sys_core::SysCodeType EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK parent: sys_core::SysCodeType;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  ALTER TYPE sys_core::SysCode {
      CREATE REQUIRED LINK codeType: sys_core::SysCodeType;
      CREATE CONSTRAINT std::exclusive ON ((.codeType, .name));
  };
  CREATE FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      std::assert_single(sys_core::SysCode FILTER
          ((.codeType.name = codeTypeName) AND (.name = codeName))
      )
  );
  CREATE FUNCTION sys_core::getCodeType(codeTypeName: std::str) -> OPTIONAL sys_core::SysCodeType USING (SELECT
      sys_core::SysCodeType
  FILTER
      (.name = codeTypeName)
  );
  CREATE TYPE sys_core::SysDataObj EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeCardinality: sys_core::SysCode;
      CREATE REQUIRED LINK codeComponent: sys_core::SysCode;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprObject: std::str;
      CREATE PROPERTY isPopup: std::bool;
      CREATE PROPERTY link: std::json;
      CREATE PROPERTY subHeader: std::str;
  };
  CREATE FUNCTION sys_core::getDataObj(dataObjName: std::str) -> OPTIONAL sys_core::SysDataObj USING (SELECT
      sys_core::SysDataObj
  FILTER
      (.name = dataObjName)
  );
  CREATE TYPE sys_core::SysDataObjAction EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE PROPERTY allTabs: std::bool;
      CREATE PROPERTY color: std::str;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE FUNCTION sys_core::getDataObjAction(dataObjActionName: std::str) -> OPTIONAL sys_core::SysDataObjAction USING (SELECT
      sys_core::SysDataObjAction
  FILTER
      (.name = dataObjActionName)
  );
  CREATE TYPE sys_core::SysDataObjFieldItemsDb EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY dbSelect: std::str;
      CREATE REQUIRED PROPERTY propertyId: std::str;
      CREATE REQUIRED PROPERTY propertyLabel: std::str;
  };
  CREATE FUNCTION sys_core::getDataObjFieldItemsDb(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldItemsDb USING (SELECT
      sys_core::SysDataObjFieldItemsDb
  FILTER
      (.name = name)
  );
  CREATE TYPE sys_core::SysEnt EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK roles: sys_core::SysCode {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_core::getEnt(entName: std::str) -> OPTIONAL sys_core::SysEnt USING (SELECT
      sys_core::SysEnt
  FILTER
      (.name = entName)
  );
  CREATE TYPE sys_core::SysNodeObj EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeIcon: sys_core::SysCode;
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE LINK dataObj: sys_core::SysDataObj {
          ON TARGET DELETE ALLOW;
      };
      CREATE LINK parent: sys_core::SysNodeObj;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
      CREATE PROPERTY page: std::str;
      CREATE PROPERTY queryActions: array<std::json>;
  };
  CREATE FUNCTION sys_core::getNodeObjById(nodeObjId: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.id = <std::uuid>nodeObjId)
  );
  CREATE FUNCTION sys_core::getNodeObjByName(nodeObjName: std::str) -> OPTIONAL sys_core::SysNodeObj USING (SELECT
      sys_core::SysNodeObj
  FILTER
      (.name = nodeObjName)
  );
  CREATE TYPE sys_core::SysOrg EXTENDING sys_core::SysEnt {
      CREATE LINK state: sys_core::SysCodeType;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY zip: std::str;
  };
  CREATE FUNCTION sys_core::getOrg(name: std::str) -> OPTIONAL sys_core::SysOrg USING (SELECT
      std::assert_single((SELECT
          sys_core::SysOrg
      FILTER
          (.name = name)
      ))
  );
  CREATE FUNCTION sys_core::getRootObj() -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = '*ROOTOBJ*')
      ))
  );
  CREATE TYPE sys_db::SysColumn EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE LINK codeAlignment: sys_core::SysCode;
      CREATE REQUIRED LINK codeDataType: sys_core::SysCode;
      CREATE LINK codeDataTypeComputed: sys_core::SysCode;
      CREATE PROPERTY JsonIdProperty: std::str;
      CREATE PROPERTY classValue: std::str;
      CREATE PROPERTY exprPreset: std::str;
      CREATE PROPERTY exprSelect: std::str;
      CREATE PROPERTY exprStorageKey: std::str;
      CREATE PROPERTY headerSide: std::str;
      CREATE PROPERTY isExcludeInsert: std::bool;
      CREATE PROPERTY isExcludeSelect: std::bool;
      CREATE PROPERTY isExcludeUpdate: std::bool;
      CREATE PROPERTY isMultiSelect: std::bool;
      CREATE PROPERTY isSetBySys: std::bool;
      CREATE PROPERTY link: std::json;
      CREATE PROPERTY matchColumn: std::str;
      CREATE PROPERTY maxLength: default::nonNegative;
      CREATE PROPERTY maxValue: std::float64;
      CREATE PROPERTY minLength: default::nonNegative;
      CREATE PROPERTY minValue: std::float64;
      CREATE PROPERTY pattern: std::str;
      CREATE PROPERTY patternMsg: std::str;
      CREATE PROPERTY patternReplacement: std::str;
      CREATE PROPERTY placeHolder: std::str;
      CREATE PROPERTY spinStep: std::str;
  };
  CREATE FUNCTION sys_db::getColumn(columnName: std::str) -> OPTIONAL sys_db::SysColumn USING (SELECT
      sys_db::SysColumn
  FILTER
      (.name = columnName)
  );
  CREATE TYPE sys_db::SysTable EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK columns: sys_db::SysColumn;
      CREATE REQUIRED PROPERTY hasMgmt: std::bool;
      CREATE REQUIRED PROPERTY mod: std::str;
  };
  CREATE FUNCTION sys_db::getTable(tableName: std::str) -> OPTIONAL sys_db::SysTable USING (SELECT
      sys_db::SysTable
  FILTER
      (.name = tableName)
  );
  CREATE TYPE sys_user::UserRoot {
      CREATE REQUIRED PROPERTY userName: std::str;
      CREATE CONSTRAINT std::exclusive ON (.userName);
  };
  CREATE FUNCTION sys_user::getRootUser() -> OPTIONAL sys_user::UserRoot USING (SELECT
      std::assert_single((SELECT
          sys_user::UserRoot
      FILTER
          (.userName = '*ROOTUSER*')
      ))
  );
  CREATE SCALAR TYPE default::Name EXTENDING std::str;
  CREATE TYPE default::SysPerson {
      CREATE REQUIRED PROPERTY firstName: default::Name;
      CREATE REQUIRED PROPERTY lastName: default::Name;
      CREATE LINK codeEthnicity: sys_core::SysCode;
      CREATE LINK codeGender: sys_core::SysCode;
      CREATE LINK codeRace: sys_core::SysCode;
      CREATE LINK codeState: sys_core::SysCode;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY avatar: std::json;
      CREATE PROPERTY birthDate: cal::local_date;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY favFood: std::str;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY zip: std::str;
  };
  ALTER TYPE sys_user::Mgmt {
      CREATE REQUIRED LINK createdBy: sys_user::UserRoot {
          SET readonly := true;
      };
      CREATE REQUIRED LINK modifiedBy: sys_user::UserRoot;
  };
  CREATE TYPE sys_user::SysStaff EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK person: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE MULTI LINK roles: sys_core::SysCode {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
  };
  CREATE FUNCTION sys_user::getStaffByName(firstName: std::str, lastName: std::str) -> OPTIONAL sys_user::SysStaff USING (SELECT
      std::assert_single(sys_user::SysStaff FILTER
          ((std::str_lower(.person.firstName) = std::str_lower(firstName)) AND (std::str_lower(.person.lastName) = std::str_lower(lastName)))
      )
  );
  CREATE TYPE sys_user::SysUserType EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK resources: sys_core::SysObj {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_user::UserRoot {
      CREATE REQUIRED LINK person: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
  CREATE TYPE sys_user::SysUser EXTENDING sys_user::UserRoot, sys_user::Mgmt {
      ALTER CONSTRAINT std::exclusive ON (.userName) {
          SET OWNED;
      };
      CREATE MULTI LINK orgs: sys_core::SysOrg {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
      CREATE MULTI LINK userTypes: sys_user::SysUserType {
          ON TARGET DELETE ALLOW;
      };
      CREATE REQUIRED PROPERTY password: std::str;
  };
  CREATE FUNCTION sys_user::getUser(userName: std::str) -> OPTIONAL sys_user::SysUser USING (SELECT
      sys_user::SysUser
  FILTER
      (.userName = userName)
  );
  CREATE FUNCTION sys_user::getUserType(userTypeName: std::str) -> OPTIONAL sys_user::SysUserType USING (SELECT
      sys_user::SysUserType
  FILTER
      (.name = userTypeName)
  );
  CREATE TYPE sys_user::SysWidget EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_user::getWidget(widgetName: std::str) -> OPTIONAL sys_user::SysWidget USING (SELECT
      sys_user::SysWidget
  FILTER
      (.name = widgetName)
  );
  CREATE GLOBAL sys_user::SYS_USER := (SELECT
      sys_user::SysUser
  FILTER
      (.userName = 'sys_user')
  );
  CREATE GLOBAL sys_user::SYS_USER_ID := (SELECT
      sys_user::SysUser {
          id
      }
  FILTER
      (.userName = 'sys_user')
  );
  CREATE GLOBAL sys_user::currentUserId -> std::uuid;
  CREATE GLOBAL sys_user::currentUser := (SELECT
      sys_user::SysUser
  FILTER
      (.id = GLOBAL sys_user::currentUserId)
  );
  CREATE TYPE app_cm::CmClient EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::SysOrg;
      CREATE REQUIRED LINK person: default::SysPerson {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
      CREATE PROPERTY agencyId: std::str;
  };
  CREATE TYPE app_cm::CmServiceFlow EXTENDING sys_core::SysObj;
  CREATE TYPE app_cm::CmClientServiceFlow EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK client: app_cm::CmClient;
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE REQUIRED LINK serviceFlow: app_cm::CmServiceFlow;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE PROPERTY dateEndEst: cal::local_date;
      CREATE REQUIRED PROPERTY dateReferral: cal::local_date;
      CREATE PROPERTY dateStart: cal::local_date;
      CREATE PROPERTY dateStartEst: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCsfData EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK clientServiceFlow: app_cm::CmClientServiceFlow;
  };
  CREATE TYPE app_cm::CmCsfCertification EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK course: app_cm::CmCourse;
      CREATE REQUIRED LINK codeCertification: sys_core::SysCode;
      CREATE REQUIRED LINK staffAgency: sys_user::SysStaff;
      CREATE PROPERTY dateExpires: cal::local_date;
      CREATE REQUIRED PROPERTY dateIssued: cal::local_date;
      CREATE PROPERTY imageCertification: std::json;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCohort EXTENDING sys_core::SysObj {
      CREATE LINK codeStatus: sys_core::SysCode;
      CREATE REQUIRED LINK course: app_cm::CmCourse;
      CREATE LINK staffAdmin: sys_user::SysStaff;
      CREATE LINK staffAgency: sys_user::SysStaff;
      CREATE LINK staffInstructor: sys_user::SysStaff;
      CREATE LINK venue: sys_core::SysOrg;
      CREATE PROPERTY capacity: std::int16;
      CREATE PROPERTY isCohortRequired: std::str;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY schedule: std::str;
  };
  CREATE TYPE app_cm::CmCsfCohort EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK cohort: app_cm::CmCohort;
      CREATE MULTI LINK codeMultiCerts: sys_core::SysCode;
      CREATE REQUIRED LINK codeStatus: sys_core::SysCode;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE PROPERTY dateReferral: cal::local_date;
      CREATE PROPERTY dateStart: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm::CmCsfNote EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE app_cm::CmCourse {
      CREATE MULTI LINK codeMultiCerts: sys_core::SysCode;
      CREATE MULTI LINK codeMultiExams: sys_core::SysCode;
      CREATE MULTI LINK codeMultiItemsIncluded: sys_core::SysCode;
      CREATE MULTI LINK codeMultiItemsNotIncluded: sys_core::SysCode;
      CREATE MULTI LINK codeMultiRqmts: sys_core::SysCode;
      CREATE LINK codeSector: sys_core::SysCode;
      CREATE LINK codeStatus: sys_core::SysCode;
      CREATE LINK codeTypePayment: sys_core::SysCodeType;
      CREATE LINK provider: sys_core::SysOrg;
      CREATE LINK staffAdmin: sys_user::SysStaff;
      CREATE LINK staffAgency: sys_user::SysStaff;
  };
  CREATE TYPE app_cm::CmCsfCohortAttd EXTENDING sys_user::Mgmt {
      CREATE REQUIRED LINK csfCohort: app_cm::CmCsfCohort;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE REQUIRED PROPERTY duration: std::float32;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE sys_admin::SaObjConfig EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE PROPERTY creator: std::str;
      CREATE PROPERTY detailActions: std::str;
      CREATE PROPERTY detailDataObj: std::str;
      CREATE PROPERTY detailHeader: std::str;
      CREATE PROPERTY detailName: std::str;
      CREATE PROPERTY detailOrder: std::int16;
      CREATE PROPERTY detailParentNodeName: std::str;
      CREATE PROPERTY detailSubHeader: std::str;
      CREATE PROPERTY hasMgmt: std::bool;
      CREATE PROPERTY icon: std::str;
      CREATE PROPERTY linkProperty: std::str;
      CREATE PROPERTY linkTableModule: std::str;
      CREATE PROPERTY linkTableName: std::str;
      CREATE PROPERTY listActions: std::str;
      CREATE PROPERTY listDataObj: std::str;
      CREATE PROPERTY listExprFilter: std::str;
      CREATE PROPERTY listHeader: std::str;
      CREATE PROPERTY listName: std::str;
      CREATE PROPERTY listOrder: std::int16;
      CREATE PROPERTY listParentNodeName: std::str;
      CREATE PROPERTY listSubHeader: std::str;
      CREATE PROPERTY objsOwner: std::str;
      CREATE PROPERTY outputDetailColumns: std::str;
      CREATE PROPERTY outputDetailDataObj: std::str;
      CREATE PROPERTY outputDetailNode: std::str;
      CREATE PROPERTY outputListColumns: std::str;
      CREATE PROPERTY outputListDataObj: std::str;
      CREATE PROPERTY outputListNode: std::str;
      CREATE PROPERTY tableModule: std::str;
      CREATE PROPERTY tableName: std::str;
      CREATE PROPERTY tableOwner: std::str;
  };
  CREATE TYPE sys_core::SysApp EXTENDING sys_core::SysEnt;
  CREATE TYPE sys_core::SysNodeObjFooter EXTENDING sys_core::SysNodeObj;
  CREATE TYPE sys_core::SysDataObjFieldEl {
      CREATE LINK codeAccess: sys_core::SysCode;
      CREATE LINK codeElement: sys_core::SysCode;
      CREATE REQUIRED LINK column: sys_db::SysColumn {
          ON SOURCE DELETE ALLOW;
      };
      CREATE LINK itemsDb: sys_core::SysDataObjFieldItemsDb {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY customElement: std::json;
      CREATE PROPERTY dbOrderCrumb: default::nonNegative;
      CREATE PROPERTY dbOrderSelect: default::nonNegative;
      CREATE PROPERTY headerAlt: std::str;
      CREATE PROPERTY height: std::int16;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
      CREATE PROPERTY items: array<std::json>;
      CREATE PROPERTY itemsDbParms: std::json;
      CREATE PROPERTY width: std::int16;
  };
  CREATE TYPE sys_core::SysDataObjFieldDb {
      CREATE LINK codeDbDataOp: sys_core::SysCode;
      CREATE LINK codeDbDataSource: sys_core::SysCode;
      CREATE LINK codeDbListDir: sys_core::SysCode;
      CREATE REQUIRED LINK column: sys_db::SysColumn {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY dbDataSourceKey: std::str;
      CREATE PROPERTY dbOrderList: default::nonNegative;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprPreset: std::str;
      CREATE PROPERTY fieldName: std::str;
      CREATE PROPERTY isDbAllowNull: std::bool;
      CREATE PROPERTY isDbFilter: std::bool;
      CREATE PROPERTY isLinkMember: std::bool;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK actions: sys_core::SysDataObjAction;
      CREATE MULTI LINK fieldsDb: sys_core::SysDataObjFieldDb {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE MULTI LINK fieldsEl: sys_core::SysDataObjFieldEl {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE LINK table: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      CREATE MULTI LINK fieldsDb: sys_core::SysDataObjFieldDb {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
  CREATE TYPE sys_test::Person {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE sys_test::Movie {
      CREATE MULTI LINK actors: sys_test::Person;
      CREATE PROPERTY title: std::str;
  };
};
