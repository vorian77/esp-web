CREATE MIGRATION m15fiphwm34sl7raqyhn6eo4tga3vzpwl7kqk5nqowtgvrumqoj7xq
    ONTO m13c6mbneukuhcv74gwnca2jf3guywcvyu2q4ccr6xsoj7eoqatwwa
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE MULTI LINK tables: sys_core::SysDataObjSubTable {
          ON SOURCE DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEl {
      CREATE MULTI LINK tables: sys_core::SysDataObjSubTable {
          ON SOURCE DELETE ALLOW;
      };
  };
};
