CREATE MIGRATION m1cbc2j6i6n24m3cwm6muzjd5naihyup5yzf7rta6jbkkaefdubwba
    ONTO m1ou5sxn2pdnoidbgn455q4vxppus2o4ea3g6hrjiga2gjllwzsqda
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP LINK link;
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE PROPERTY link: std::json;
  };
};
