CREATE MIGRATION m1hykt7rn7jbxmzopiquuwg5j6ckyh4gs6hsiepl5siylntrgpds5a
    ONTO m1gh5lm2ep63fitpijognrvujzchfm6akkhgrsz4c5ztcxoxpmeyiq
{
  ALTER TYPE sys_obj::DataObj {
      CREATE LINK table: sys_db::Table;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY exprObject: std::str;
      CREATE PROPERTY isPopup: std::bool;
      CREATE PROPERTY link: std::json;
      CREATE PROPERTY subHeader: std::str;
  };
  ALTER TYPE sys_obj::Form {
      ALTER LINK table {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY description {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY exprFilter {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY exprObject {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY isPopup {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY link {
          DROP OWNED;
          RESET TYPE;
      };
      ALTER PROPERTY subHeader {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
