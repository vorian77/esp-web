CREATE MIGRATION m1yegd5w3ep7oggisabef5gyhuvxg2q52viubelh3c3tx6febf7kga
    ONTO m1lagpuskvcmtfrh33ry75y64xgkrnw3w5iycrolryhdfam7hkkewa
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY isExcludeSelect: std::bool;
  };
};
