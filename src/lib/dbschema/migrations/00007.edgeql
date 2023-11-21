CREATE MIGRATION m1b4hwqklkjedtuwky5dtbpzepx6f5tsraqwnsqy5nkbngqn2z4qca
    ONTO m1w5v2culipqdfvusjg33ehqe2czbwsypojm532x7a5nr7ttykwnrq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprInsert: std::str;
  };
};
