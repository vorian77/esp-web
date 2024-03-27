CREATE MIGRATION m1ujzo74k5avjjhla3ygnyicesmasqmbz2jo3vrnfnopldp2bhjtna
    ONTO m15xrhaxgpnmzgjmrmkb4ycgwqcxnaplaxsmywiwtmklant5gydj2q
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK columns;
      DROP LINK fieldsDb;
      DROP LINK fieldsEl;
  };
  CREATE TYPE sys_core::SysDataObjColumn {
      CREATE LINK codeAccess: sys_core::SysCode;
      CREATE LINK codeDbDataOp: sys_core::SysCode;
      CREATE LINK codeDbDataSource: sys_core::SysCode;
      CREATE LINK codeDbListDir: sys_core::SysCode;
      CREATE LINK codeElement: sys_core::SysCode;
      CREATE REQUIRED LINK column: sys_db::SysColumn;
      CREATE LINK itemsDb: sys_core::SysDataObjFieldItemsDb;
      CREATE PROPERTY customElement: std::json;
      CREATE PROPERTY dbDataSourceKey: std::str;
      CREATE PROPERTY dbOrderCrumb: default::nonNegative;
      CREATE PROPERTY dbOrderList: default::nonNegative;
      CREATE PROPERTY dbOrderSelect: default::nonNegative;
      CREATE PROPERTY exprPresetScalar: std::str;
      CREATE PROPERTY fieldName: std::str;
      CREATE PROPERTY headerAlt: std::str;
      CREATE PROPERTY height: std::int16;
      CREATE PROPERTY indexTable: std::str;
      CREATE PROPERTY isDbAllowNull: std::bool;
      CREATE PROPERTY isDbFilter: std::bool;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
      CREATE PROPERTY items: array<std::json>;
      CREATE PROPERTY itemsDbParms: std::json;
      CREATE PROPERTY link: std::json;
      CREATE PROPERTY width: std::int16;
  };
};
