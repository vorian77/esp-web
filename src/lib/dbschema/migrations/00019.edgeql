CREATE MIGRATION m1mrfq3nsncw76wmwgwcjqb3zgvl3qevsf2xwhcjhdr33re26zmuoa
    ONTO m1mml67qmd6jvkdzbjs5qc5l7swdbfh2ds32f2wgrcs2dhv3fg6wsa
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER LINK column {
          ON SOURCE DELETE DELETE TARGET;
      };
      ALTER LINK tables {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
