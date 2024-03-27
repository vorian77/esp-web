CREATE MIGRATION m1cmzst2judfw3ao4ea3op2fvggzixlymy5q5jtzqkkmrnjj4on5yq
    ONTO m1zdyyu25x6dpbv3ssjvpgl6mkgmnpaauzafowfrkwjocivhq733ra
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE LINK linkTable: sys_db::SysTable;
  };
};
