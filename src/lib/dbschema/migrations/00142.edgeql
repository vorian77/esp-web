CREATE MIGRATION m1nm3kkzbbqsqehuuzqiuybnojagh6zntds4inkjmuk7i4nvmjrg4a
    ONTO m1q7v3yp7ssauywttito6ojyxwagqkf3fyc5grbk34pf65ab2oaizq
{
  CREATE TYPE app_cm::CmCohortAttd EXTENDING sys_core::SysObj {
      CREATE REQUIRED LINK cohort: app_cm::CmCohort;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE REQUIRED PROPERTY duration: std::float32;
      CREATE PROPERTY note: std::str;
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      DROP LINK csfCohort;
      DROP PROPERTY date;
  };
};
