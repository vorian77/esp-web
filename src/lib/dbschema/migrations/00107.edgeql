CREATE MIGRATION m1ukrc5ve5xsd6vidnlnquk253pw6izzodmqcm3fjsgg2l36ktuw5q
    ONTO m1xxylrbddnm6udsll53s4ofvi3p6acpjm33777ujvwumq2jqge7tq
{
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY toggleLabelFalse {
          RENAME TO toggleValueFalse;
      };
  };
  ALTER TYPE sys_db::SysColumn {
      ALTER PROPERTY toggleLabelTrue {
          RENAME TO toggleValueTrue;
      };
  };
};
