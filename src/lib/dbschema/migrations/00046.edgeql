CREATE MIGRATION m15xrhaxgpnmzgjmrmkb4ycgwqcxnaplaxsmywiwtmklant5gydj2q
    ONTO m1gcdtd5xvvdtpwd3gmv7tgqiwcjj53m3mgccqxwop3xopvb4xez6q
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK columns: sys_db::SysColumn;
  };
};
