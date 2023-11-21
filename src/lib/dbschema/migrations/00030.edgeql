CREATE MIGRATION m1lagpuskvcmtfrh33ry75y64xgkrnw3w5iycrolryhdfam7hkkewa
    ONTO m1qm6b63lx3vjoernqtc6tpwpj3gouae4dhagdsz7akjg3ntsslpfq
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY isValSetBySys {
          RENAME TO isSetBySys;
      };
  };
};
