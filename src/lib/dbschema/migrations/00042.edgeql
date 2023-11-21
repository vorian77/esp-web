CREATE MIGRATION m1z3ovtvkxtp4m4hzckm76x3tgev3ptpwdwm552dxzjsr6zvshtgfq
    ONTO m1b64qtickvgjxsmk3f6zjtnhn2lt6eltw3zfhesmm7avqw4pa2uxq
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY isDbExcludeInsert {
          RENAME TO isExcludeInsert;
      };
  };
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY isDbExcludeUpdate {
          RENAME TO isExcludeUpdate;
      };
  };
};
