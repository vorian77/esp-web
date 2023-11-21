CREATE MIGRATION m1xtailqv5tx2ywgy462kpj7innn7oqj7dj2p2qw4mnwgsl2yb7hda
    ONTO m1z3ovtvkxtp4m4hzckm76x3tgev3ptpwdwm552dxzjsr6zvshtgfq
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY imgKey {
          RENAME TO fileKey;
      };
  };
};
