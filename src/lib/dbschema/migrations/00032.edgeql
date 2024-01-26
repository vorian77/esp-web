CREATE MIGRATION m15uwsqcu4codjh45yivgqpbrefpkof22yqatz3gpufn55bfwhmkjq
    ONTO m1inzkcokbknn5zu2ut3zvnywb6kxhmd7zcgysc5k3k6mjg36opvbq
{
  CREATE TYPE sys_core::SysDataObjFieldLinkJoinColumn {
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE LINK table: sys_db::SysTable;
      CREATE REQUIRED PROPERTY order: default::nonNegative;
  };
};
