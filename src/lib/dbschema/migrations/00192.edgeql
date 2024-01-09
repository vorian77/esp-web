CREATE MIGRATION m1p3e3m7u5lokykgqmtqkmclbkpydbiqcddbhgkbjptcqbo6lq67tq
    ONTO m1bzannxogx45hm3cpnhdrp2bj5pbfbb6bmuxof2w6xmtgbvmu7hha
{
  CREATE MODULE sys_admin IF NOT EXISTS;
  CREATE TYPE sys_admin::ObjConfig EXTENDING sys_core::Obj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE PROPERTY creator: std::str;
      CREATE PROPERTY detailActions: std::str;
      CREATE PROPERTY detailDataObj: std::str;
      CREATE PROPERTY detailHeader: std::str;
      CREATE PROPERTY detailName: std::str;
      CREATE PROPERTY detailOrder: std::str;
      CREATE PROPERTY detailParentNodeName: std::str;
      CREATE PROPERTY detailSubHeader: std::str;
      CREATE PROPERTY icon: std::str;
      CREATE PROPERTY linkProperty: std::str;
      CREATE PROPERTY linkTableModule: std::str;
      CREATE PROPERTY linkTableName: std::str;
      CREATE PROPERTY listActions: std::str;
      CREATE PROPERTY listDataObj: std::str;
      CREATE PROPERTY listExprFilter: std::str;
      CREATE PROPERTY listHeader: std::str;
      CREATE PROPERTY listName: std::str;
      CREATE PROPERTY listOrder: std::str;
      CREATE PROPERTY listParentNodeName: std::str;
      CREATE PROPERTY listSubHeader: std::str;
      CREATE PROPERTY objsOwner: std::str;
      CREATE PROPERTY outputDetailDataObj: std::str;
      CREATE PROPERTY outputDetailNode: std::str;
      CREATE PROPERTY outputListDataObj: std::str;
      CREATE PROPERTY outputListNode: std::str;
      CREATE PROPERTY tableModule: std::str;
      CREATE PROPERTY tableName: std::str;
      CREATE PROPERTY tableOwner: std::str;
  };
};
