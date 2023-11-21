CREATE MIGRATION m1ft7m2kncq4rdbywkncivwzzynqqm4bptw7grnuhsakhfbi3nosda
    ONTO m1b4hwqklkjedtuwky5dtbpzepx6f5tsraqwnsqy5nkbngqn2z4qca
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprInsert;
  };
};
