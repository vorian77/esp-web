CREATE MIGRATION m1ttpbdxvka34xuzylhl7nqgf4kij6e2y5d4wopifnszszj7m6odjq
    ONTO m17hrurlr7a5clztchqn6fqmbe72umlbif2fkw24hcwh2qsf3o7bhq
{
  ALTER TYPE default::Person {
      DROP PROPERTY race;
  };
  ALTER TYPE default::Person {
      CREATE LINK race: sys_core::Code;
  };
};
