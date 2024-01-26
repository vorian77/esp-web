CREATE MIGRATION m1gcdtd5xvvdtpwd3gmv7tgqiwcjj53m3mgccqxwop3xopvb4xez6q
    ONTO m1ywsvd3i2g5lxoffbzmcaekpmtweauj2ljwjzlkznnv6fvbrmjiuq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK fieldsDb {
          ON SOURCE DELETE DELETE TARGET;
      };
      ALTER LINK fieldsEl {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
