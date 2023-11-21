CREATE MIGRATION m1c6zezkjcccys7ioxjym65so5yczitxbgwvkfd3gvrfdf5d2yldqq
    ONTO m1zp74pkant3kzwfdkgog2zjjtbwho2lydhtkmh6pt5wh6476b6c6a
{
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeCerts;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeExams;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeItemsIncluded;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeItemsNotIncluded;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeRqmts;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeSector;
  };
  ALTER TYPE app_cm_training::Course {
      DROP LINK codeTypePayment;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI PROPERTY codeCerts: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI PROPERTY codeExams: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI PROPERTY codeItemsIncluded: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI PROPERTY codeItemsNotIncluded: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI PROPERTY codeRqmts: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE PROPERTY codeSector: std::str;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE PROPERTY codeTypePayment: std::str;
  };
};
