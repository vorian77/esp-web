CREATE MIGRATION m1tybq3rrgofexyumyamccjmw3erd7dkx6vofo2ygxog3ibysqo5mq
    ONTO m1d2gih6mc5a3gmfvwq54nj7lvpzzgrbsw36nz6f6wtxmwugdksn5a
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY hours {
          USING (SELECT
              .codeCmCohortAttdDuration.valueDecimal
          );
      };
  };
};
