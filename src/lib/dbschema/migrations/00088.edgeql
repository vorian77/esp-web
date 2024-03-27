CREATE MIGRATION m17qb4nflbuc44xp4oghy3hzc3w27wwickjurkrl6pp3u62qtwemwq
    ONTO m1ria43d64zr6imqgrspzucyyus2sqr72v7uogmgy2oc4p6jevropq
{
  CREATE TYPE sys_core::SysDataObjFieldChips EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY btnLabelComplete: std::str;
      CREATE REQUIRED PROPERTY columnLabelDisplay: std::str;
      CREATE PROPERTY headerSub: std::str;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
  };
  CREATE FUNCTION sys_core::getDataObjFieldChips(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldChips USING (SELECT
      sys_core::SysDataObjFieldChips
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldChips: sys_core::SysDataObjFieldChips;
  };
};
