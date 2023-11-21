CREATE MIGRATION m1mfac2trnrz6kdkcm2vazieqn5yzokxgxpbm5lr7s7e4jdnxtqh7a
    ONTO m1pq4tn76kdyvsi5pnve6ydrxsv2fyemgcd6ai4dsh4s7gqrbw46nq
{
  ALTER TYPE sys_obj::FormField {
      ALTER PROPERTY isDbSysSet {
          RENAME TO isDbSetBySys;
      };
  };
};
