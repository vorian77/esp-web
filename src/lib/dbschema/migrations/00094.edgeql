CREATE MIGRATION m1ntv252vqpvbc7nluul7jyepkvcqbzxger3jsdma6fjyqkzs6ruaa
    ONTO m1tl7j6fzo2tbgaa7sbgi62m27j3zeileuzzzsylqvyyzthdwmnbpa
{
  ALTER TYPE sys_db::Table {
      CREATE PROPERTY mod: std::str;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER LINK parentTable {
          RENAME TO tableParent;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER LINK parentTable {
          RENAME TO tableParent;
      };
  };
};
