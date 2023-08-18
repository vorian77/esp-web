CREATE MIGRATION m1scqxsk2xfrv7dgfnu55noehq3txd6rqu5kq2o76ptekzhnuvvnwa
    ONTO initial
{
  CREATE MODULE sys_app IF NOT EXISTS;
  CREATE MODULE sys_core IF NOT EXISTS;
  CREATE MODULE sys_user IF NOT EXISTS;
  CREATE MODULE test IF NOT EXISTS;
  CREATE SCALAR TYPE default::Name EXTENDING std::str {
      CREATE CONSTRAINT std::min_len_value(3);
  };
  CREATE ABSTRACT TYPE default::Mgmt {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE PROPERTY modified_at: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_transaction());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_transaction());
      };
  };
  CREATE TYPE sys_core::SysEnt EXTENDING default::Mgmt {
      CREATE REQUIRED PROPERTY name: default::Name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE FUNCTION sys_core::getEnt(entName: std::str) -> OPTIONAL sys_core::SysEnt USING (SELECT
      sys_core::SysEnt
  FILTER
      (.name = entName)
  );
  CREATE SCALAR TYPE sys_app::SysAppNodeObjType EXTENDING enum<FORM_LIST, FORM_DETAIL, FORM_TEST>;
  CREATE ABSTRACT TYPE sys_app::SysAppNodeType EXTENDING default::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::SysEnt;
      CREATE REQUIRED PROPERTY name: default::Name;
      CREATE PROPERTY name_display: std::str;
  };
  CREATE ABSTRACT TYPE sys_app::SysAppNodeObj EXTENDING sys_app::SysAppNodeType {
      CREATE PROPERTY obj_type: sys_app::SysAppNodeObjType;
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name, .obj_type));
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY sub_header: std::str;
  };
  CREATE TYPE sys_app::SysForm EXTENDING sys_app::SysAppNodeObj {
      CREATE PROPERTY submit_button_label: std::str;
  };
  CREATE FUNCTION sys_app::getAppForm(formOwnerName: std::str, formName: std::str, formObjType: sys_app::SysAppNodeObjType) -> OPTIONAL sys_app::SysForm USING (SELECT
      sys_app::SysForm
  FILTER
      (((.owner = (SELECT
          sys_core::getEnt(formOwnerName)
      )) AND (.name = formName)) AND (.obj_type = formObjType))
  );
  CREATE SCALAR TYPE default::non_negative EXTENDING std::int64 {
      CREATE CONSTRAINT std::min_value(0);
  };
  CREATE TYPE sys_app::SysAppProgram EXTENDING sys_app::SysAppNodeType {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
      CREATE REQUIRED PROPERTY order: default::non_negative;
  };
  CREATE FUNCTION sys_app::getAppProgram(ownerName: std::str, programName: std::str) -> OPTIONAL sys_app::SysAppProgram USING (SELECT
      sys_app::SysAppProgram
  FILTER
      ((.owner = (SELECT
          sys_core::getEnt(ownerName)
      )) AND (.name = programName))
  );
  CREATE TYPE sys_app::SysAppNode EXTENDING sys_app::SysAppNodeType {
      CREATE REQUIRED LINK program: sys_app::SysAppProgram;
      CREATE CONSTRAINT std::exclusive ON ((.program, .name));
      CREATE MULTI LINK objs: sys_app::SysAppNodeObj;
      CREATE REQUIRED LINK parent: sys_app::SysAppNodeType;
      CREATE REQUIRED PROPERTY order: default::non_negative;
  };
  CREATE FUNCTION sys_app::getAppNode(programOwnerName: std::str, programName: std::str, nodeName: std::str) -> OPTIONAL sys_app::SysAppNode USING (SELECT
      sys_app::SysAppNode
  FILTER
      ((.program = (SELECT
          sys_app::getAppProgram(programOwnerName, programName)
      )) AND (.name = nodeName))
  );
  CREATE ABSTRACT TYPE sys_core::SysObj EXTENDING default::Mgmt {
      CREATE REQUIRED LINK owner: sys_core::SysEnt;
      CREATE REQUIRED PROPERTY name: default::Name;
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
      CREATE PROPERTY name_display: std::str;
  };
  CREATE TYPE sys_core::SysCodeType EXTENDING sys_core::SysObj;
  CREATE FUNCTION sys_core::getCodeType(codeTypeOwnerName: std::str, codeTypeName: std::str) -> OPTIONAL sys_core::SysCodeType USING (SELECT
      sys_core::SysCodeType
  FILTER
      ((.owner = (SELECT
          sys_core::getEnt(codeTypeOwnerName)
      )) AND (.name = codeTypeName))
  );
  CREATE TYPE sys_core::SysCode EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK code_type: sys_core::SysCodeType;
  };
  CREATE FUNCTION sys_core::getCode(codeTypeOwnerName: std::str, codeTypeName: std::str, codeOwnerName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCode USING (SELECT
      sys_core::SysCode
  FILTER
      (((.code_type = (SELECT
          sys_core::getCodeType(codeTypeOwnerName, codeTypeName)
      )) AND (.owner = (SELECT
          sys_core::getEnt(codeOwnerName)
      ))) AND (.name = codeName))
  );
  CREATE FUNCTION sys_core::getSysObj(objOwnerName: std::str, objName: std::str) -> OPTIONAL sys_core::SysObj USING (SELECT
      sys_core::SysObj
  FILTER
      ((.owner = (SELECT
          sys_core::getEnt(objOwnerName)
      )) AND (.name = objName))
  );
  CREATE ABSTRACT TYPE default::Person {
      CREATE PROPERTY first_name: default::Name;
      CREATE PROPERTY last_name: default::Name;
      CREATE PROPERTY full_name := (((.first_name ++ ' ') ++ .last_name));
  };
  CREATE TYPE sys_user::User EXTENDING default::Person {
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY password: std::str;
  };
  CREATE FUNCTION sys_user::getUser(userName: std::str) -> OPTIONAL sys_user::User USING (SELECT
      sys_user::User
  FILTER
      (.username = userName)
  );
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
  ALTER TYPE default::Mgmt {
      CREATE REQUIRED LINK created_by: default::Person {
          SET readonly := true;
      };
      CREATE REQUIRED LINK modified_by: default::Person;
  };
  CREATE TYPE test::Person {
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE test::Movie {
      CREATE MULTI LINK actors: test::Person;
      CREATE PROPERTY title: std::str;
  };
};
