CREATE MIGRATION m1rajvm2ex4kxgeb7ld4pfqvfouz6vpqtvtg56uqkskiyjnei2lu6q
    ONTO m1xtailqv5tx2ywgy462kpj7innn7oqj7dj2p2qw4mnwgsl2yb7hda
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY fileKey {
          RENAME TO exprStorageKey;
      };
  };
};
