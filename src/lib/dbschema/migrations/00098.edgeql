CREATE MIGRATION m1ct6cfy36ynmu3jflg2wsv4ow7mfled3js62kfl3jxb25j7sxw5ca
    ONTO m1p566dcqmh4yykg7y5gedcbxug6ayddwd5xzbxo3rk44cqzrrspva
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK fieldListChips {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
