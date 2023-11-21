CREATE MIGRATION m1b64qtickvgjxsmk3f6zjtnhn2lt6eltw3zfhesmm7avqw4pa2uxq
    ONTO m1ylscn7bpat3aclaepa3bls5zssrywf2vngumi6nyn4ntdiwuiazq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY isDbExcludeInsert: std::bool;
      CREATE PROPERTY isDbExcludeUpdate: std::bool;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY isDbExcludeInsert;
      DROP PROPERTY isDbExcludeUpdate;
  };
};
