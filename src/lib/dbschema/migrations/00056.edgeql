CREATE MIGRATION m1ush7jvgbedqs3bxk2uj5qz6zbj6vdu35nkzz4a6l7jwrrbsufnvq
    ONTO m1sxxzpplam7hop2stql6yjtpzrxrbqncq6ylaxtxxhx4wdr2y36qq
{
  ALTER TYPE app_cm::CmCsfCohort {
      CREATE PROPERTY dateEndEst: cal::local_date;
      CREATE PROPERTY dateStartEst: cal::local_date;
  };
};
