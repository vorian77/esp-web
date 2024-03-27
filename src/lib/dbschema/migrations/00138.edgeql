CREATE MIGRATION m14xiwf5v7mfffkxrizd2d2frge7kmhaxqjqttetl7es2znedawuyq
    ONTO m15agcku64diu6acvmocgklklr7lmn42m2rv3a4hlfslvz5vih675q
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK tableParent {
          RENAME TO parentTable;
      };
  };
};
