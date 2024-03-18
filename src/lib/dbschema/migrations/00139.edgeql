CREATE MIGRATION m1d7xdkneoq5haylqv3miuftzixd6fwwsqtrtj2rd4pcesdpugxnnq
    ONTO m14xiwf5v7mfffkxrizd2d2frge7kmhaxqjqttetl7es2znedawuyq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK parentColumn: sys_db::SysColumn;
  };
};
