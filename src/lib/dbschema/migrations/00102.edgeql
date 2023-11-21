CREATE MIGRATION m1debtudogb72jn6wkfcztoygxrk5uryccijrzg433cdaxemott2vq
    ONTO m14w7tp3bobcxssyjuwkj2cz4hqx3owgz3bqxkf6lgezpfl3suoada
{
  ALTER TYPE app_cm_training::Course {
      CREATE MULTI LINK codeCerts: sys_core::Code;
      CREATE MULTI LINK codeExams: sys_core::Code;
      CREATE MULTI LINK codeItemsIncluded: sys_core::Code;
      CREATE MULTI LINK codeItemsNotIncluded: sys_core::Code;
      CREATE MULTI LINK codeRqmts: sys_core::Code;
      ALTER LINK codeSector {
          RESET OPTIONALITY;
      };
      CREATE LINK codeTypePayment: sys_core::CodeType;
      CREATE LINK provider: sys_core::Org;
      CREATE PROPERTY cost: std::float32;
      ALTER PROPERTY isActive {
          RESET OPTIONALITY;
      };
      CREATE PROPERTY schedule: std::str;
  };
};
