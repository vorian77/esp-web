CREATE MIGRATION m1hjy3jf22kwswc4ywwaisyr62a7l4vyobbl4u3m3q3dlu56ffke5a
    ONTO m15claaw4qoocsuz2mj4xamlw43nb4iodipd2pr5z3ozhgiruuw4da
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE CONSTRAINT std::exclusive ON ((.csfCohort, .cohortAttd));
  };
};
