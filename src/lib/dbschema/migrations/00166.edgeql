CREATE MIGRATION m1dkzu7uhy42lc42go3adga2eaaom5c44hdxdol4oiqtyrfenmruua
    ONTO m1swjgxcrodohyrot7w7snetrom76kaiqabybxorrv3br6n3fhtfea
{
  CREATE TYPE app_cm_training::ClientCohort EXTENDING app_cm::ClientData {
      CREATE MULTI LINK codeOutcomes: sys_core::Code;
      CREATE REQUIRED LINK codeStatus: sys_core::Code;
      CREATE REQUIRED LINK cohort: app_cm_training::Cohort;
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE PROPERTY dateStart: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
  CREATE TYPE app_cm_training::ClientCohortAttd EXTENDING app_cm::ClientData {
      CREATE REQUIRED LINK clientCohort: app_cm_training::ClientCohort;
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE REQUIRED PROPERTY duration: std::decimal;
      CREATE PROPERTY note: std::str;
  };
};
