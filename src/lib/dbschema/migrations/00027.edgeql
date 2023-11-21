CREATE MIGRATION m1wv72h53wzk5zrheygsc7bxwtqw6lbxwbc6m7kx5amyh3lfttiu5q
    ONTO m1kcqqrt4lp2qizjtbetn353aqksnks4ukxwz4xtebwhhwjkjms4tq
{
  CREATE TYPE sys_obj::FormFieldElItem {
      CREATE PROPERTY itemId: std::int32;
      CREATE PROPERTY label: std::str;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE MULTI LINK item: sys_obj::FormFieldElItem {
          ON SOURCE DELETE ALLOW;
      };
  };
};
