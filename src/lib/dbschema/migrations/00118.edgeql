CREATE MIGRATION m1yehzf6o45utug2s7qs3jxgzss5eb6c5zovnyyfmhrxw6vipr6bxq
    ONTO m1ck4q6bmcsliksn3xnphbhovs4ak4ejjmp4733t2ckryswgdxj4ka
{
  CREATE FUNCTION sys_core::getDataObjActionGroup(name: std::str) -> OPTIONAL sys_core::SysDataObjActionGroup USING (SELECT
      sys_core::SysDataObjActionGroup
  FILTER
      (.name = name)
  );
};
