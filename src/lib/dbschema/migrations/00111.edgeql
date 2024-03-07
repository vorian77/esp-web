CREATE MIGRATION m1n4vf372adsklo2rnabxxxfop3hlk7u4ejnfcxt4zapndnnbmzqna
    ONTO m1227u3pn7j62lakhezp2wq2sloekgwmemhm52jorerkgfcyceefxa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListConfig: sys_core::SysDataObjFieldListConfig {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
