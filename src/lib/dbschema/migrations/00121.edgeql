CREATE MIGRATION m1vtqifbhfur334s4bgku3kfvstwafht57c2mdtp4g37bdbbirnd6a
    ONTO m1fge3k4fbqvngwdarpofjtg3ac4sogy3fdmtkeqctgzhchrvuh4sa
{
  ALTER TYPE sys_db::Column {
      CREATE LINK codeDataTypePreset: sys_core::Code;
  };
};
