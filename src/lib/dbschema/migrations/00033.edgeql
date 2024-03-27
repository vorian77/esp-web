CREATE MIGRATION m1icv4ohfbiu7l25g7gtehdaaa2btlempfdbnokuvob5e45rtny3dq
    ONTO m15uwsqcu4codjh45yivgqpbrefpkof22yqatz3gpufn55bfwhmkjq
{
  ALTER TYPE app_cm::CmCsfData {
      ALTER LINK clientServiceFlow {
          RENAME TO csf;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE LINK columnDisplay: sys_db::SysColumn;
      CREATE MULTI LINK tabColsAncestors: sys_core::SysDataObjFieldLinkJoinColumn;
  };
};
