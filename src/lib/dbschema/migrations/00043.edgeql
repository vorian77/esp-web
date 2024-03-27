CREATE MIGRATION m16okhmcj7wtdsohysupini4gctebvs54zmqjfmagxbvluacxjwwfq
    ONTO m1ee5b3ziec5eydo7uhgw7a4s6ritdcccmpr7ipctbkyfbb5jufq3a
{
  CREATE TYPE sys_core::SysObjConfig EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE PROPERTY creator: std::str;
      CREATE PROPERTY detailActions: std::str;
      CREATE PROPERTY detailDataObj: std::str;
      CREATE PROPERTY detailHeader: std::str;
      CREATE PROPERTY detailName: std::str;
      CREATE PROPERTY detailOrder: std::int16;
      CREATE PROPERTY detailParentNodeName: std::str;
      CREATE PROPERTY detailSubHeader: std::str;
      CREATE PROPERTY hasMgmt: std::bool;
      CREATE PROPERTY icon: std::str;
      CREATE PROPERTY linkProperty: std::str;
      CREATE PROPERTY linkTableModule: std::str;
      CREATE PROPERTY linkTableName: std::str;
      CREATE PROPERTY listActions: std::str;
      CREATE PROPERTY listDataObj: std::str;
      CREATE PROPERTY listExprFilter: std::str;
      CREATE PROPERTY listHeader: std::str;
      CREATE PROPERTY listName: std::str;
      CREATE PROPERTY listOrder: std::int16;
      CREATE PROPERTY listParentNodeName: std::str;
      CREATE PROPERTY listSubHeader: std::str;
      CREATE PROPERTY objsOwner: std::str;
      CREATE PROPERTY outputDetailColumns: std::str;
      CREATE PROPERTY outputDetailDataObj: std::str;
      CREATE PROPERTY outputDetailNode: std::str;
      CREATE PROPERTY outputListColumns: std::str;
      CREATE PROPERTY outputListDataObj: std::str;
      CREATE PROPERTY outputListNode: std::str;
      CREATE PROPERTY tableModule: std::str;
      CREATE PROPERTY tableName: std::str;
      CREATE PROPERTY tableOwner: std::str;
  };
};
