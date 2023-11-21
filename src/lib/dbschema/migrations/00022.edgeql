CREATE MIGRATION m1mygjzjcgeqttcpjprvlfivhfaiqu2rxpsyk2b7vasrqbm5iefjkq
    ONTO m1r5wvkn4p33cwc3p6rf4hksjn35yvq5c3a5hxv4upvkmalxqcf2gq
{
  ALTER TYPE sys_obj::Form {
      CREATE MULTI LINK fieldsEl: sys_obj::FormFieldEl {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
