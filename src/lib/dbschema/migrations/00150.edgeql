CREATE MIGRATION m15claaw4qoocsuz2mj4xamlw43nb4iodipd2pr5z3ozhgiruuw4da
    ONTO m1s6tvecv7ltirqtkd255vzgsxcxgrepr7hsvn5veokh4fxy7irsha
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY togglePresetTrue: std::bool;
  };
};
