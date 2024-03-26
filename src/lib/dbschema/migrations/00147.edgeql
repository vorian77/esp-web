CREATE MIGRATION m1lpbwznf7o3dzuvos3pmd6p3azbwfss5mqz46ns22g5mshl3wtrba
    ONTO m1nmwxcsmb53ls3lwng5i33yppmhai3ywil72h53vy3itwsduu2rma
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE REQUIRED PROPERTY fullDuration: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
