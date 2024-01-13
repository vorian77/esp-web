CREATE MIGRATION m1qwqn2767ec4h4z5myvk2i2sif34uufzmcr2n4flvn33ck6agw3bq
    ONTO m1vot3gwta7jzxhgiq4mwhd2wpwrn2ez2ucwzs3iopv3i3mii2bkfa
{
  ALTER TYPE sys_db::SysTable {
      CREATE REQUIRED PROPERTY mod: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
