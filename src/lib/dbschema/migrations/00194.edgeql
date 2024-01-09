CREATE MIGRATION m1wchpnvwx5tvbh7aslylfbji3j4u2tz7l47tdqpkith6t47bsgeaa
    ONTO m1umddl4a5kdfvwsuz32o4ez5mbysjsbei3cwakynyv3s2zmne5j4q
{
  ALTER TYPE sys_admin::ObjConfig {
      CREATE PROPERTY outputDetailColumns: std::str;
      CREATE PROPERTY outputListColumns: std::str;
  };
};
