CREATE MIGRATION m1xmo6keb6lkvs64vbq6vriw52sxrcdjqye3hfcgg77su733nhwofa
    ONTO m1mygjzjcgeqttcpjprvlfivhfaiqu2rxpsyk2b7vasrqbm5iefjkq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprPreselect: std::str;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP LINK codeDbDataSourcePreselect;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER PROPERTY columnNameAlias {
          RENAME TO fieldName;
      };
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY dbDataSourceKeyPreselect;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY dbName;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE PROPERTY dbExpr: std::str;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY exprSelectPreselect;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER PROPERTY isDbExcludeSave {
          RENAME TO isDbExcludeInsert;
      };
  };
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER PROPERTY isDbExcludeSaveUpdate {
          RENAME TO isDbExcludeUpdate;
      };
  };
};
