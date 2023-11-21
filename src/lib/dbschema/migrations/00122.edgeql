CREATE MIGRATION m1s5yitxvr5kdttigph2w5ojbou2yyuvfnair4vdobwc5u4lqe7ikq
    ONTO m1vtqifbhfur334s4bgku3kfvstwafht57c2mdtp4g37bdbbirnd6a
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprPreset: std::str;
      CREATE PROPERTY exprSave: std::str;
  };
};
