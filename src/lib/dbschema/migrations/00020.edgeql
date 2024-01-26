CREATE MIGRATION m1hcvqdgwjwsusa3sdcma6oojagjha2c4xk755u25v7y4s27dbmi4a
    ONTO m1mrfq3nsncw76wmwgwcjqb3zgvl3qevsf2xwhcjhdr33re26zmuoa
{
  ALTER TYPE sys_core::SysDataObjFieldEl {
      ALTER LINK column {
          ON SOURCE DELETE DELETE TARGET;
      };
      ALTER LINK itemsDb {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
