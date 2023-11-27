CREATE MIGRATION m1uwmxqqekrfvovnwlodqtlomrqg6kpieokwhi6gyflenvbt4irzva
    ONTO m1vpuuirxkybjbmfy7adbkrsox24kiplytrowvigzyro2zoswi2g2q
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprPreset;
      DROP PROPERTY exprSave;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER PROPERTY dbExpr {
          RENAME TO exprFilter;
      };
  };
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE PROPERTY exprPreset: std::str;
  };
};
