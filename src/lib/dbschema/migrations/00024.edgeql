CREATE MIGRATION m1k5dnjvrr7yndmk6b2ze35pvc2pxbgnc3vfytjyhomhmfsofnom3a
    ONTO m1uczw6wo46pogzwjmrbbhp5ovndubyjjey7k3ibspzoxzd6de5raq
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE LINK table: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP LINK tables;
  };
};
