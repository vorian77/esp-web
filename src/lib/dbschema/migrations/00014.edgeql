CREATE MIGRATION m1gsn3mfl6s6wpsm3ziqia3qaqdbwmxf3ezpieioqel3zvetr5g5hq
    ONTO m14bmqojmkct7bzmr33tkr5fsozpjlfbp664yv3vv46qzpxveoduvq
{
  ALTER TYPE sys_obj::FormField {
      ALTER LINK codeDbDataSourcePreset {
          RENAME TO codeDbDataSourcePreselect;
      };
  };
  ALTER TYPE sys_obj::FormField {
      ALTER PROPERTY dbDataSourceKeyPreset {
          RENAME TO dbDataSourceKeyPreselect;
      };
  };
  ALTER TYPE sys_obj::FormField {
      ALTER PROPERTY exprSelectPreset {
          RENAME TO exprSelectPreselect;
      };
  };
};
