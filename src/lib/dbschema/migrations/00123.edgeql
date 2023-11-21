CREATE MIGRATION m1mz3dxgvp3bhhjnbnmx264dzwelirqy3qawjnur24ejexlffgp6tq
    ONTO m1s5yitxvr5kdttigph2w5ojbou2yyuvfnair4vdobwc5u4lqe7ikq
{
  ALTER TYPE app_cm_training::Course {
      ALTER LINK codeCerts {
          RENAME TO codeMultiCerts;
      };
  };
  ALTER TYPE app_cm_training::Course {
      ALTER LINK codeExams {
          RENAME TO codeMultiExams;
      };
  };
  ALTER TYPE app_cm_training::Course {
      ALTER LINK codeItemsIncluded {
          RENAME TO codeMultiItemsIncluded;
      };
  };
  ALTER TYPE app_cm_training::Course {
      ALTER LINK codeItemsNotIncluded {
          RENAME TO codeMultiItemsNotIncluded;
      };
  };
  ALTER TYPE app_cm_training::Course {
      ALTER LINK codeRqmts {
          RENAME TO codeMultiRqmts;
      };
  };
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY isMultiSelect: std::bool;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY isMultiSelect;
  };
};
