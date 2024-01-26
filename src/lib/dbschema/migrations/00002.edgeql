CREATE MIGRATION m1i27p6ja4ltvxo3wfyeajb46ur3qiq45wsbg4simiplxgsigtdr2q
    ONTO m1ce7zh5dsazbqhb3ahmxs7wt6gqtdxahqeu2wehrlxpf5vb3lkh3a
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY exprSave: std::str;
  };
};
