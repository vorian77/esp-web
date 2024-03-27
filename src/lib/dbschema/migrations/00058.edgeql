CREATE MIGRATION m1vuzjjy2nx247e5ms3j2opz3cionwjq34qo6nudltvbbnhhdzra2q
    ONTO m1dq2dbvjhvyl2ab2b77kxyai2wrdnp73mjibdvfwt2hjcjpczad7a
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY exprSelect {
          RENAME TO exprCustom;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY nameCustom: std::str;
  };
};
