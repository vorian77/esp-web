CREATE MIGRATION m145jjbu7ux6k34e5pejnyqzxmn5xaksqdxuixd2ttw4solwfaqgwa
    ONTO initial
{
  CREATE MODULE app_cm_training IF NOT EXISTS;
  CREATE MODULE sys_core IF NOT EXISTS;
  CREATE MODULE sys_db IF NOT EXISTS;
  CREATE MODULE sys_obj IF NOT EXISTS;
  CREATE MODULE sys_test IF NOT EXISTS;
  CREATE MODULE sys_user IF NOT EXISTS;
  CREATE TYPE sys_core::ObjRoot {
      CREATE PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE ABSTRACT TYPE default::Mgmt {
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
  CREATE ABSTRACT TYPE sys_core::Obj EXTENDING sys_core::ObjRoot, default::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::ObjRoot;
  };
  CREATE TYPE sys_core::CodeType EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_core::getCodeType(codeTypeName: std::str) -> OPTIONAL sys_core::CodeType USING (SELECT
      sys_core::CodeType
  FILTER
      (.name = codeTypeName)
  );
  CREATE TYPE sys_core::Code EXTENDING sys_core::Obj {
      CREATE REQUIRED LINK codeType: sys_core::CodeType;
      CREATE CONSTRAINT std::exclusive ON ((.codeType, .name));
  };
  CREATE FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::Code USING (SELECT
      sys_core::Code
  FILTER
      ((.codeType = (SELECT
          sys_core::getCodeType(codeTypeName)
      )) AND (.name = codeName))
  );
  CREATE TYPE sys_core::Ent EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_core::getEnt(entName: std::str) -> OPTIONAL sys_core::Ent USING (SELECT
      sys_core::Ent
  FILTER
      (.name = entName)
  );
  CREATE TYPE sys_db::Table EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
      CREATE REQUIRED PROPERTY hasMgmt: std::bool;
  };
  CREATE FUNCTION sys_db::getTable(ownerName: std::str, tableName: std::str) -> OPTIONAL sys_db::Table USING (SELECT
      sys_db::Table
  FILTER
      ((.owner = (SELECT
          sys_core::getEnt(ownerName)
      )) AND (.name = tableName))
  );
  CREATE FUNCTION sys_core::getRoot() -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = 'root')
      ))
  );
  CREATE SCALAR TYPE default::nonNegative EXTENDING std::int64 {
      CREATE CONSTRAINT std::min_value(0);
  };
  CREATE TYPE sys_db::Column EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeAlignment: sys_core::Code;
      CREATE REQUIRED LINK codeDataType: sys_core::Code;
      CREATE PROPERTY dynamicLabel: std::str;
      CREATE PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY hRows: std::int16;
      CREATE PROPERTY headerSide: std::str;
      CREATE PROPERTY matchColumn: std::str;
      CREATE PROPERTY maxLength: default::nonNegative;
      CREATE PROPERTY maxValue: default::nonNegative;
      CREATE PROPERTY minLength: default::nonNegative;
      CREATE PROPERTY minValue: default::nonNegative;
      CREATE PROPERTY pattern: std::str;
      CREATE PROPERTY patternMsg: std::str;
      CREATE PROPERTY patternReplacement: std::str;
      CREATE PROPERTY placeHolder: std::str;
      CREATE PROPERTY staticLabel: std::str;
      CREATE REQUIRED PROPERTY width: std::int16;
  };
  CREATE FUNCTION sys_db::getColumn(columnName: std::str) -> OPTIONAL sys_db::Column USING (SELECT
      sys_db::Column
  FILTER
      (.name = columnName)
  );
  CREATE TYPE sys_obj::DataObjAction EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
  CREATE FUNCTION sys_obj::getDataObjAction(dataObjActionName: std::str) -> OPTIONAL sys_obj::DataObjAction USING (SELECT
      sys_obj::DataObjAction
  FILTER
      (.name = dataObjActionName)
  );
  CREATE TYPE sys_obj::NodeObj EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeIcon: sys_core::Code;
      CREATE REQUIRED LINK codeType: sys_core::Code;
      CREATE LINK parent: sys_obj::NodeObj;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
      CREATE REQUIRED PROPERTY page: std::str;
  };
  CREATE FUNCTION sys_obj::getNodeObjById(nodeObjId: std::str) -> OPTIONAL sys_obj::NodeObj USING (SELECT
      sys_obj::NodeObj
  FILTER
      (.id = <std::uuid>nodeObjId)
  );
  CREATE FUNCTION sys_obj::getNodeObjByName(nodeObjName: std::str) -> OPTIONAL sys_obj::NodeObj USING (SELECT
      sys_obj::NodeObj
  FILTER
      (.name = nodeObjName)
  );
  CREATE SCALAR TYPE default::Name EXTENDING std::str;
  CREATE ABSTRACT TYPE default::Person {
      CREATE PROPERTY firstName: default::Name;
      CREATE PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
  };
  CREATE TYPE sys_user::User EXTENDING default::Person {
      CREATE REQUIRED PROPERTY userName: std::str;
      CREATE CONSTRAINT std::exclusive ON (.userName);
      CREATE REQUIRED PROPERTY password: std::str;
  };
  CREATE FUNCTION sys_user::getUser(userName: std::str) -> OPTIONAL sys_user::User USING (SELECT
      sys_user::User
  FILTER
      (.userName = userName)
  );
  ALTER TYPE default::Mgmt {
      CREATE REQUIRED LINK createdBy: default::Person {
          SET readonly := true;
      };
      CREATE REQUIRED LINK modifiedBy: default::Person;
  };
  CREATE TYPE sys_user::UserType EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK resources: sys_core::Obj {
          ON TARGET DELETE ALLOW;
      };
  };
  CREATE FUNCTION sys_user::getUserType(userTypeName: std::str) -> OPTIONAL sys_user::UserType USING (SELECT
      sys_user::UserType
  FILTER
      (.name = userTypeName)
  );
  CREATE TYPE sys_user::Widget EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_user::getWidget(widgetName: std::str) -> OPTIONAL sys_user::Widget USING (SELECT
      sys_user::Widget
  FILTER
      (.name = widgetName)
  );
  ALTER TYPE sys_user::User {
      CREATE MULTI LINK userTypes: sys_user::UserType {
          ON TARGET DELETE ALLOW;
          CREATE PROPERTY isActive: std::bool;
      };
  };
  CREATE GLOBAL sys_user::SYS_USER := (SELECT
      sys_user::User
  FILTER
      (.userName = 'sys_user')
  );
  CREATE GLOBAL sys_user::SYS_USER_ID := (SELECT
      sys_user::User {
          id
      }
  FILTER
      (.userName = 'sys_user')
  );
  CREATE GLOBAL sys_user::currentUserId -> std::uuid;
  CREATE GLOBAL sys_user::currentUser := (SELECT
      sys_user::User
  FILTER
      (.id = GLOBAL sys_user::currentUserId)
  );
  CREATE TYPE app_cm_training::Student EXTENDING default::Person, default::Mgmt {
      CREATE REQUIRED PROPERTY agencyId: std::str;
      CREATE PROPERTY email: std::str;
  };
  CREATE TYPE sys_core::App EXTENDING sys_core::Ent;
  CREATE ABSTRACT TYPE sys_obj::DataObj EXTENDING sys_core::Obj {
      CREATE MULTI LINK actions: sys_obj::DataObjAction;
      CREATE REQUIRED LINK codeCardinality: sys_core::Code;
      CREATE REQUIRED LINK codeComponent: sys_core::Code;
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE TYPE sys_obj::FormField {
      CREATE LINK codeAccess: sys_core::Code;
      CREATE LINK codeDbDataOp: sys_core::Code;
      CREATE LINK codeDbDataSource: sys_core::Code;
      CREATE LINK codeDbListDir: sys_core::Code;
      CREATE LINK codeElement: sys_core::Code;
      CREATE LINK codeInputType: sys_core::Code;
      CREATE REQUIRED LINK column: sys_db::Column {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY dbDataSourceKey: std::str;
      CREATE PROPERTY dbListOrder: default::nonNegative;
      CREATE PROPERTY dbName: std::str;
      CREATE PROPERTY dbSelectOrder: default::nonNegative;
      CREATE PROPERTY isDbAllowNull: std::bool;
      CREATE PROPERTY isDbExcludeInsert: std::bool;
      CREATE PROPERTY isDbExcludeUpdate: std::bool;
      CREATE PROPERTY isDbIdentity: std::bool;
      CREATE PROPERTY isDbListOrderField: std::bool;
      CREATE PROPERTY isDbPreset: std::bool;
      CREATE PROPERTY isDbSys: std::bool;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
  };
  CREATE TYPE sys_obj::Form EXTENDING sys_obj::DataObj {
      CREATE LINK table: sys_db::Table;
      CREATE MULTI LINK fields: sys_obj::FormField {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY isPopup: std::bool;
      CREATE PROPERTY subHeader: std::str;
      CREATE PROPERTY submitButtonLabel: std::str;
  };
  ALTER TYPE sys_db::Table {
      CREATE MULTI LINK columns: sys_db::Column {
          ON SOURCE DELETE ALLOW;
          CREATE CONSTRAINT std::exclusive;
          CREATE PROPERTY isIdentity: std::bool;
          CREATE PROPERTY isRequired: std::bool;
      };
  };
  ALTER TYPE sys_obj::NodeObj {
      CREATE LINK dataObj: sys_obj::DataObj {
          ON TARGET DELETE ALLOW;
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
