CREATE MIGRATION m1my4xjuxnrauaazivqr3ougrimcwj475yypv2akx4kiugc2d4wnqa
    ONTO m1f5yv5iorjycj4kplsstmh32ar4plgf6pux74jyvczjqymqvbjyrq
{
  ALTER TYPE sys_core::SysDataObjActionGroup {
      ALTER LINK actions {
          RESET ON SOURCE DELETE;
      };
  };
};
