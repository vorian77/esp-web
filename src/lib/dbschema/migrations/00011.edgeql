CREATE MIGRATION m1bth5cv3r7dihxb5vzugiryrew3zh7yo3caz26isqtnzyqt2fsrfq
    ONTO m1cbc2j6i6n24m3cwm6muzjd5naihyup5yzf7rta6jbkkaefdubwba
{
  CREATE TYPE sys_core::SysDataObjSubTable {
      CREATE REQUIRED LINK table: sys_db::SysTable;
      CREATE REQUIRED PROPERTY property: std::str;
  };
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK subTables {
          SET TYPE sys_core::SysDataObjSubTable USING (.subTables[IS sys_core::SysDataObjSubTable]);
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP PROPERTY isLinkMember;
  };
};
