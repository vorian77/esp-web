CREATE MIGRATION m1kgwx2oduef7ods5cg2tc2kprj7dzcwnut3gxucr6tuymskuq66oa
    ONTO m1n5blwuati3e646r34kj6vvrv44idpvbcuvpckwci52pciaybblka
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY hours {
          RENAME TO computedHours;
      };
  };
};
