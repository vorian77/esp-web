CREATE MIGRATION m1ajakn2tdh2n77z766q2pj7ckntyf5es62jztzpl56d342uv7aeua
    ONTO m1fgjv3y26prwhukzasmyyi2j5czumns2f2vyojdm5bgkbabaoss4a
{
  ALTER TYPE default::Mgmt {
      DROP LINK createdBy;
  };
  ALTER TYPE default::Mgmt {
      DROP LINK modifiedBy;
  };
  ALTER TYPE default::Mgmt RENAME TO sys_user::Mgmt;
  ALTER TYPE sys_user::Mgmt {
      CREATE REQUIRED LINK createdBy: sys_user::User {
          SET readonly := true;
          SET REQUIRED USING (<sys_user::User>{});
      };
      CREATE REQUIRED LINK modifiedBy: sys_user::User {
          SET REQUIRED USING (<sys_user::User>{});
      };
  };
  ALTER TYPE app_cm_training::Course DROP EXTENDING sys_user::Mgmt;
  ALTER TYPE app_cm_training::Section DROP EXTENDING sys_user::Mgmt;
};
