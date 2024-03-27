CREATE MIGRATION m1ehpjzxgk4rbnzdadvczeygcbgd5r5zphte5pvoidpbdgmjx7gxuq
    ONTO m1hcvqdgwjwsusa3sdcma6oojagjha2c4xk755u25v7y4s27dbmi4a
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK fieldsDb {
          RESET ON SOURCE DELETE;
      };
      ALTER LINK fieldsEl {
          RESET ON SOURCE DELETE;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER LINK column {
          RESET ON SOURCE DELETE;
      };
      ALTER LINK tables {
          RESET ON SOURCE DELETE;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEl {
      ALTER LINK column {
          RESET ON SOURCE DELETE;
      };
      ALTER LINK itemsDb {
          RESET ON SOURCE DELETE;
      };
  };
};
