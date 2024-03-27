CREATE MIGRATION m1inya6dvxirdj4dk5jn5ia23fqfvt3o3sp6npwdp33outvh4zxxoa
    ONTO m1d7xdkneoq5haylqv3miuftzixd6fwwsqtrtj2rd4pcesdpugxnnq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK parentTable {
          SET TYPE sys_db::SysTable USING (.parentTable[IS sys_db::SysTable]);
      };
  };
};
