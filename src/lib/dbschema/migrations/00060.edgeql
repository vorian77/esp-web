CREATE MIGRATION m16gctanqvwx5oollpwoegckvk5moyw5b2m6tkac762ye7n2hgq4tq
    ONTO m17woc2cya6uesdqfiaw7d3vd2nbaxy2jxijaftrvpu4tmjoyfsmaq
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY isSelfReference: std::bool;
  };
};
