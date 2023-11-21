CREATE MIGRATION m1wogqr6bgujlh6wx2fapk234lx6fesafqxy3ejfeojptpyw3slrja
    ONTO m1xmo6keb6lkvs64vbq6vriw52sxrcdjqye3hfcgg77su733nhwofa
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY isValSetBySys: std::bool;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY isDbSetBySys;
  };
};
