CREATE MIGRATION m1mniq5eyfj4v5456ida4r57cwqfktadgu4kuvi3un2w6aao5msz3q
    ONTO m1cmzst2judfw3ao4ea3op2fvggzixlymy5q5jtzqkkmrnjj4on5yq
{
  CREATE TYPE sys_core::SysDataObjFieldLink {
      CREATE LINK codeDataTypeDisplay: sys_core::SysCode;
      CREATE LINK codeMask: sys_core::SysCode;
      CREATE REQUIRED LINK table: sys_db::SysTable;
      CREATE PROPERTY exprDisplay: std::str;
      CREATE PROPERTY exprSelect: std::str;
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE LINK link: sys_core::SysDataObjFieldLink;
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP LINK linkTable;
  };
};
