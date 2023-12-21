CREATE MIGRATION m1n6cuhggiszxd5m3ccfg3s3decqxs72tyvc3fxtue4wb7g67eocxq
    ONTO m1jtyzgedktzssog4ixomchahxxzlw5xciilyuw6yhg77h6l6fuhka
{
  ALTER TYPE app_cm_training::ClientCohort RENAME TO app_cm_training::CsfCohort;
  ALTER TYPE app_cm_training::ClientCohortAttd RENAME TO app_cm_training::CsfCohortAttd;
  ALTER TYPE app_cm_training::CsfCohortAttd {
      ALTER LINK clientCohort {
          RENAME TO csfCohort;
      };
  };
};
