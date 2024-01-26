CREATE MIGRATION m1ou5sxn2pdnoidbgn455q4vxppus2o4ea3g6hrjiga2gjllwzsqda
    ONTO m1mniq5eyfj4v5456ida4r57cwqfktadgu4kuvi3un2w6aao5msz3q
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER LINK link {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
