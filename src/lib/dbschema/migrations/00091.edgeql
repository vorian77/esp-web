CREATE MIGRATION m1qhmyxvyka4r5affgojlkxokynxpoifoujqbx2uurpmberjus5jkq
    ONTO m1ad2qhcxnj2hvk4n4mkvikq7luhhrrptzk5rkmzaihasssxcwi63a
{
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE LINK tableParent: sys_db::Table;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE LINK tableParent: sys_db::Table;
  };
};
