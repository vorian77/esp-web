CREATE MIGRATION m17hrurlr7a5clztchqn6fqmbe72umlbif2fkw24hcwh2qsf3o7bhq
    ONTO m1lf3ocowlrknspf3gkqnvesjgakrwbnpg3ff4j67y6ueyazzo7buq
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY edgeTypeDefn;
  };
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY edgeTypeDisplayProperty: std::str;
  };
};
