CREATE MIGRATION m1f5yv5iorjycj4kplsstmh32ar4plgf6pux74jyvczjqymqvbjyrq
    ONTO m1iklefcet35hb3vzy3z6scniwoqdlplm3nrkcjfybg4qgqll2pplq
{
  CREATE TYPE sys_core::SysDataObjActionGroup EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE MULTI LINK actions: sys_core::SysDataObjAction {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
