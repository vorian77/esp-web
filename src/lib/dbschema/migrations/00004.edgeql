CREATE MIGRATION m1benebjk6gux6qepag4v2q2qotb3w635fzvk7w3bmgkgywteq5rwa
    ONTO m1qwqn2767ec4h4z5myvk2i2sif34uufzmcr2n4flvn33ck6agw3bq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY table {
          SET TYPE std::json USING (<std::json>.table);
      };
  };
};
