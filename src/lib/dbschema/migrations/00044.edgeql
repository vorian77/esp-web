CREATE MIGRATION m1ywsvd3i2g5lxoffbzmcaekpmtweauj2ljwjzlkznnv6fvbrmjiuq
    ONTO m16okhmcj7wtdsohysupini4gctebvs54zmqjfmagxbvluacxjwwfq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK tables {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
