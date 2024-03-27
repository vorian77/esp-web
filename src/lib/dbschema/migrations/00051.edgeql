CREATE MIGRATION m1ofswtyuvsmvlkxejftn2g4qa5dyknu5qqqpfgo6r4jcwpcnahdhq
    ONTO m1nrbv4hppoyoc3dq3nyddiiiqxhwbotcja5bdpvvumd62jbcn2srq
{
  ALTER TYPE sys_core::SysDataObjTable {
      CREATE REQUIRED PROPERTY order: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
