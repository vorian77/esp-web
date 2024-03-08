CREATE MIGRATION m1ck4q6bmcsliksn3xnphbhovs4ak4ejjmp4733t2ckryswgdxj4ka
    ONTO m1my4xjuxnrauaazivqr3ougrimcwj475yypv2akx4kiugc2d4wnqa
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
      };
  };
};
