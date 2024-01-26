CREATE MIGRATION m1knixh6x5micvs3gq6wuam4etzyzjb4dtvi6ll5c2besuhvaxmeua
    ONTO m1bayon5g5j5wwyb7gp73r7xya7eby735bmbwbde7peqgna42wmcsq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE LINK columnSubTable: sys_db::SysColumn;
  };
  ALTER TYPE sys_core::SysDataObjSubTable {
      CREATE REQUIRED LINK column: sys_db::SysColumn {
          SET REQUIRED USING (<sys_db::SysColumn>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjSubTable {
      DROP PROPERTY property;
  };
};
