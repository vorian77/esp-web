CREATE MIGRATION m1n5blwuati3e646r34kj6vvrv44idpvbcuvpckwci52pciaybblka
    ONTO m1tybq3rrgofexyumyamccjmw3erd7dkx6vofo2ygxog3ibysqo5mq
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY hours {
          USING (SELECT
              (.codeCmCohortAttdDuration.valueDecimal * .cohortAttd.hours)
          );
      };
  };
};
