CREATE MIGRATION m1zp74pkant3kzwfdkgog2zjjtbwho2lydhtkmh6pt5wh6476b6c6a
    ONTO m1debtudogb72jn6wkfcztoygxrk5uryccijrzg433cdaxemott2vq
{
  ALTER TYPE app_cm_training::Course {
      ALTER LINK staffAgency {
          RENAME TO staffProvider;
      };
  };
};
