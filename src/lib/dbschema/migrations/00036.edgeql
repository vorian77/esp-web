CREATE MIGRATION m1sg4dztczmvoox4sy5fmwuch5ifz5wdlvjpdibearxqfwob3lo7ha
    ONTO m13exsl425lkzwo3uy7hmikwlfqoig3twxiu3zam3qyctuuzlrg7sa
{
  CREATE TYPE sys_core::SysDataObjTable {
      CREATE REQUIRED LINK table: sys_db::SysTable;
      CREATE REQUIRED PROPERTY index: default::nonNegative;
      CREATE PROPERTY indexParent: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK tables: sys_core::SysDataObjTable;
  };
};
