CREATE MIGRATION m1tl7j6fzo2tbgaa7sbgi62m27j3zeileuzzzsylqvyyzthdwmnbpa
    ONTO m1kiwi5vslkdi4zzdglydh2og2rz7fak464732jytgsuzibwwhnqta
{
  ALTER TYPE sys_core::Ent {
      ALTER LINK roles {
          RESET readonly;
          SET OWNED;
          SET MULTI;
          SET TYPE sys_core::Code;
      };
  };
  ALTER TYPE sys_core::Obj {
      DROP LINK roles;
  };
  ALTER TYPE sys_db::Table {
      ALTER LINK columns {
          DROP CONSTRAINT std::exclusive;
          DROP PROPERTY isIdentity;
          DROP PROPERTY isRequired;
      };
  };
};
