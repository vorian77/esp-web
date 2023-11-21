CREATE MIGRATION m1r5wvkn4p33cwc3p6rf4hksjn35yvq5c3a5hxv4upvkmalxqcf2gq
    ONTO m1c3vvwl2plnp4up5cczslwhusju2ep43md45hbhsayluj4gc44m6a
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY classValue;
      DROP PROPERTY dynamicLabelKey;
      DROP PROPERTY height;
      DROP PROPERTY staticLabel;
      DROP PROPERTY width;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP LINK codeAccess;
      DROP LINK codeElement;
      DROP LINK codeInputType;
      DROP PROPERTY isDisplay;
      DROP PROPERTY isDisplayable;
  };
  CREATE TYPE sys_obj::FormFieldEl {
      CREATE LINK codeAccess: sys_core::Code;
      CREATE LINK codeElement: sys_core::Code;
      CREATE LINK codeInputType: sys_core::Code;
      CREATE REQUIRED LINK column: sys_db::Column {
          ON SOURCE DELETE ALLOW;
      };
      CREATE PROPERTY classValue: std::str;
      CREATE PROPERTY dynamicLabelKey: std::str;
      CREATE PROPERTY height: std::int16;
      CREATE PROPERTY isDisplay: std::bool;
      CREATE PROPERTY isDisplayable: std::bool;
      CREATE PROPERTY staticLabel: std::str;
      CREATE PROPERTY width: std::int16;
  };
};
