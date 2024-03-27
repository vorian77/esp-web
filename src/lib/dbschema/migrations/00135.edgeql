CREATE MIGRATION m1b6az7dj6hmizxeqqd6rvstnclxsw7ky3l2fga74sb277qpmtnljq
    ONTO m1bca2ggsm6g4pohfdx7ekmg5lkpukyvpholzvytmc3adrfceo6ahq
{
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE REQUIRED LINK dataObjSelect: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<sys_core::SysDataObj>{});
      };
  };
};
