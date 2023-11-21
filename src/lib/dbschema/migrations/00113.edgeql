CREATE MIGRATION m13qdwk4cqd44uy5pce7brxkhwfu4nmn762rfu5clhg33ybjccif4a
    ONTO m1ttpbdxvka34xuzylhl7nqgf4kij6e2y5d4wopifnszszj7m6odjq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY edgeTypeDefn: std::json;
  };
  ALTER TYPE sys_db::Column {
      DROP PROPERTY edgeTypeDisplayProperty;
  };
};
