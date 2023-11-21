CREATE MIGRATION m1ad2qhcxnj2hvk4n4mkvikq7luhhrrptzk5rkmzaihasssxcwi63a
    ONTO m12eut4afc4wdemethgcqtqjbvi5366rydq4ls3qhcemmixxy5cx3a
{
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE LINK table: sys_db::Table;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE LINK table: sys_db::Table;
  };
};
