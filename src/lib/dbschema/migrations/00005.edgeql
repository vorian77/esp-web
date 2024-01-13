CREATE MIGRATION m1a5nnegzwbv3uu6mmiryo7m53ci2bdkgwkq53eib4qwknwvvyfptq
    ONTO m1benebjk6gux6qepag4v2q2qotb3w635fzvk7w3bmgkgywteq5rwa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY table;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK table: sys_db::SysTable;
  };
};
