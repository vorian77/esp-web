CREATE MIGRATION m1fh633kmk4akhhl53lgx7dh56otoeohm4h4h76osoba52datn7mzq
    ONTO m1lpbwznf7o3dzuvos3pmd6p3azbwfss5mqz46ns22g5mshl3wtrba
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE REQUIRED LINK csfCohort: app_cm::CmCsfCohort {
          SET REQUIRED USING (<app_cm::CmCsfCohort>{});
      };
  };
};
