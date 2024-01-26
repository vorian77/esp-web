CREATE MIGRATION m1dq2dbvjhvyl2ab2b77kxyai2wrdnp73mjibdvfwt2hjcjpczad7a
    ONTO m1ush7jvgbedqs3bxk2uj5qz6zbj6vdu35nkzz4a6l7jwrrbsufnvq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY exprSelect: std::str;
  };
};
