CREATE MIGRATION m1zdyyu25x6dpbv3ssjvpgl6mkgmnpaauzafowfrkwjocivhq733ra
    ONTO m1676leinewh7ppaxxrnc3t2nnp4dudevtcunrv723elgfqvk3x42q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK subTables: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY link;
  };
};
