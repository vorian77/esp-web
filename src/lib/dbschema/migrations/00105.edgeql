CREATE MIGRATION m1kix32idrjmnxkbanu7awdhd6zdysp5bwtxh4k2y3dmqbolab26ja
    ONTO m1c6zezkjcccys7ioxjym65so5yczitxbgwvkfd3gvrfdf5d2yldqq
{
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeCerts;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeCerts: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeExams;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeExams: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeItemsIncluded;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeItemsIncluded: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeItemsNotIncluded;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeItemsNotIncluded: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeRqmts;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeRqmts: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeSector;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE LINK codeSector: sys_core::Code;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeTypePayment;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE LINK codeTypePayment: sys_core::CodeType;
  };
};
