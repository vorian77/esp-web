CREATE MIGRATION m1ds2mxonnzcmu2qeyfe5wyepwvxkwpxt2e6zzv2ue6rtpnalvpdta
    ONTO m1eunj4cvb24cu6pssu2cdopeiyjihygal2tunor2sonhkj345itpq
{
  ALTER TYPE sys_db::SysColumn {
      CREATE PROPERTY toggleLabelFalse: std::str;
      CREATE PROPERTY toggleLabelTrue: std::str;
  };
};
