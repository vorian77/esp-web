CREATE MIGRATION m1r3urhrjvipjkcj6xfbny6caqzw4p7fhaq6gyenzffifjnhie57pa
    ONTO initial
{
  CREATE MODULE cm_training IF NOT EXISTS;
  CREATE MODULE sys_app IF NOT EXISTS;
  CREATE MODULE sys_core IF NOT EXISTS;
  CREATE MODULE sys_form IF NOT EXISTS;
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
  CREATE TYPE sys_app::HomeScreen EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_app::getHomeScreen(homeScreenName: std::str) -> OPTIONAL sys_app::HomeScreen USING (SELECT
      sys_app::HomeScreen
  FILTER
      (.name = homeScreenName)
  );
  CREATE TYPE sys_app::HomeScreenWidget EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_app::getHomeScreenWidget(widgetName: std::str) -> OPTIONAL sys_app::HomeScreenWidget USING (SELECT
      sys_app::HomeScreenWidget
  FILTER
      (.name = widgetName)
  );
  CREATE TYPE sys_core::Ent EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_core::getEnt(entName: std::str) -> OPTIONAL sys_core::Ent USING (SELECT
      sys_core::Ent
  FILTER
      (.name = entName)
  );
  CREATE SCALAR TYPE default::nonNegative EXTENDING std::int64 {
      CREATE CONSTRAINT std::min_value(0);
  };
  CREATE TYPE sys_app::Node EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
      CREATE LINK parent: sys_app::Node;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
      CREATE REQUIRED PROPERTY page: std::str;
  };
  CREATE FUNCTION sys_app::getNode(ownerName: std::str, nodeName: std::str) -> OPTIONAL sys_app::Node USING (SELECT
      sys_app::Node
  FILTER
      ((.owner = (SELECT
          sys_core::getEnt(ownerName)
      )) AND (.name = nodeName))
  );
  CREATE ABSTRACT TYPE sys_app::NodeObj EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_app::getNodeObj(nodeObjName: std::str) -> OPTIONAL sys_app::NodeObj USING (SELECT
      sys_app::NodeObj
  FILTER
      (.name = nodeObjName)
  );
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
  CREATE FUNCTION sys_core::getRoot() -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = 'root')
      ))
  );
  CREATE SCALAR TYPE default::Name EXTENDING std::str {
      CREATE CONSTRAINT std::min_len_value(3);
  };
  CREATE ABSTRACT TYPE default::Person {
      CREATE PROPERTY firstName: default::Name;
      CREATE PROPERTY lastName: default::Name;
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
  };
  CREATE TYPE sys_user::User EXTENDING default::Person {
      CREATE REQUIRED PROPERTY username: std::str;
      CREATE CONSTRAINT std::exclusive ON (.username);
      CREATE MULTI LINK resources: sys_core::Obj {
          ON TARGET DELETE ALLOW;
          CREATE PROPERTY allow: std::bool {
              SET default := true;
          };
      };
      CREATE REQUIRED PROPERTY password: std::str;
  };
  CREATE FUNCTION sys_user::getUser(userName: std::str) -> OPTIONAL sys_user::User USING (SELECT
      sys_user::User
  FILTER
      (.username = userName)
  );
  ALTER TYPE default::Mgmt {
      CREATE REQUIRED LINK createdBy: default::Person {
          SET readonly := true;
      };
      CREATE REQUIRED LINK modifiedBy: default::Person;
  };
  CREATE TYPE sys_user::UserType EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK users: sys_user::User {
          ON TARGET DELETE ALLOW;
      };
      CREATE MULTI LINK resources: sys_core::Obj {
          ON TARGET DELETE ALLOW;
          CREATE PROPERTY allow: std::bool {
              SET default := true;
          };
      };
  };
  CREATE FUNCTION sys_user::getUserType(userTypeName: std::str) -> OPTIONAL sys_user::UserType USING (SELECT
      sys_user::UserType
  FILTER
      (.name = userTypeName)
  );
  ALTER TYPE sys_user::User {
      CREATE MULTI LINK userTypes := (.<users[IS sys_user::UserType]);
  };
  CREATE GLOBAL sys_user::SYS_USER := (SELECT
      sys_user::User
  FILTER
      (.username = 'sys_user')
  );
  CREATE GLOBAL sys_user::SYS_USER_ID := (SELECT
      sys_user::User {
          id
      }
  FILTER
      (.username = 'sys_user')
  );
  CREATE GLOBAL sys_user::currentUserId -> std::uuid;
  CREATE GLOBAL sys_user::currentUser := (SELECT
      sys_user::User
  FILTER
      (.id = GLOBAL sys_user::currentUserId)
  );
  CREATE TYPE cm_training::Student EXTENDING default::Person, default::Mgmt {
      CREATE REQUIRED PROPERTY agencyId: std::str;
      CREATE PROPERTY email: std::str;
  };
  CREATE TYPE sys_form::FormActionItem {
      CREATE LINK codeDataType: sys_core::Code;
      CREATE LINK codeOp: sys_core::Code;
      CREATE LINK codeSource: sys_core::Code;
      CREATE REQUIRED PROPERTY dbName: default::Name;
      CREATE PROPERTY sourceKey: std::str;
  };
  CREATE TYPE sys_form::FormAction {
      CREATE REQUIRED LINK codeType: sys_core::Code;
      CREATE MULTI LINK filterItems: sys_form::FormActionItem;
      CREATE REQUIRED PROPERTY query: std::str;
  };
  CREATE TYPE sys_form::FormField {
      CREATE REQUIRED PROPERTY header: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE sys_form::Form EXTENDING sys_app::NodeObj {
      CREATE MULTI LINK actions: sys_form::FormAction;
      CREATE MULTI LINK fields: sys_form::FormField;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY subHeader: std::str;
  };
  CREATE TYPE sys_core::App EXTENDING sys_core::Ent;
  ALTER TYPE sys_app::HomeScreen {
      CREATE MULTI LINK widgets: sys_app::HomeScreenWidget {
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_app::Node {
      CREATE LINK codeComponent: sys_core::Code;
      CREATE REQUIRED LINK codeIcon: sys_core::Code;
      CREATE REQUIRED LINK codeType: sys_core::Code;
      CREATE LINK obj: sys_app::NodeObj {
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
