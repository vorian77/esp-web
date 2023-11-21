CREATE MIGRATION m1pq4tn76kdyvsi5pnve6ydrxsv2fyemgcd6ai4dsh4s7gqrbw46nq
    ONTO m1xuubqbzhmoemm2hxipjjcuuzrpydjqaldzqdes65se2nouhg3nka
{
  ALTER TYPE sys_db::Column {
      ALTER LINK codeAlignment {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY dynamicLabel {
          RENAME TO classValue;
      };
  };
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY dynamicLabelKey: std::str;
  };
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY hRows {
          RENAME TO height;
      };
  };
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY height {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY width {
          RESET OPTIONALITY;
      };
  };
};
