CREATE MIGRATION m1y2eyis4tqjidtoo3p52dcdit5n5z2326yrgeza4h5heiu74rbr6q
    ONTO m1ds2mxonnzcmu2qeyfe5wyepwvxkwpxt2e6zzv2ue6rtpnalvpdta
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY chipsHeader: std::str;
      CREATE PROPERTY chipsHeaderSub: std::str;
      CREATE PROPERTY chipsSelectMulti: std::bool;
  };
};
