CREATE MIGRATION m1bzrphyl3gf3getnk2mjhvkz6fqgimvfuiy5xgonjkda26fqoe7cq
    ONTO m1icv4ohfbiu7l25g7gtehdaaa2btlempfdbnokuvob5e45rtny3dq
{
  ALTER TYPE sys_core::SysDataObjFieldLinkJoinColumn {
      ALTER LINK table {
          SET REQUIRED USING (<sys_db::SysTable>{});
      };
  };
};
