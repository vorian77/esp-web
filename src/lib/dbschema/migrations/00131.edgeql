CREATE MIGRATION m1ph4ygfmtxo6aijb442wnfwbfqwylkwod43bdbcxkd7ekwuo6svha
    ONTO m1feznv7vn3x2jtyw7oraoln22zrw5afmgmeayf6pii3q3t2p3y2jq
{
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
      };
  };
};
