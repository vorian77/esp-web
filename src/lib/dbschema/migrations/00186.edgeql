CREATE MIGRATION m1owyzot2a2kxuc5au55omyinywbqmgblfkfvfy32korvbptbihnfa
    ONTO m1n6cuhggiszxd5m3ccfg3s3decqxs72tyvc3fxtue4wb7g67eocxq
{
  ALTER TYPE app_cm_training::CsfCohort {
      CREATE PROPERTY dateReferral: cal::local_date;
  };
};
