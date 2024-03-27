CREATE MIGRATION m17hohapwpb7fta3rordxgkmb2xkatz76k4qhwdb2wzultgvszjb6a
    ONTO m12nf52rght63i7ywkhz43amdj6f3zrucq4ey523btfa5a3rd6nmwa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK table;
  };
  ALTER TYPE sys_core::SysDataObjTable {
      CREATE LINK columnParent: sys_db::SysColumn;
  };
};
