CREATE MIGRATION m1k6z74mmxrv4yfbvlal6salm3xroexifetat6pjdhyn4fa6eq4opa
    ONTO m1qbcylxrxqguk7tg4mohoyq77fkvmayxqu2bqblwa2rdbr4d2mdoa
{
  ALTER TYPE sys_core::SysDataObjAction {
      DROP PROPERTY confirm;
  };
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE LINK confirm: sys_core::SysDataObjActionConfirm;
  };
};
