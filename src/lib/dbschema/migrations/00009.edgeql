CREATE MIGRATION m14d52vzpv3mchgcqkpukzutfn3cyrurbu5aus4hzixzp4r2kb47ua
    ONTO m1ft7m2kncq4rdbywkncivwzzynqqm4bptw7grnuhsakhfbi3nosda
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprSave: std::str;
  };
};
