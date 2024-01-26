CREATE MIGRATION m13exsl425lkzwo3uy7hmikwlfqoig3twxiu3zam3qyctuuzlrg7sa
    ONTO m1bzrphyl3gf3getnk2mjhvkz6fqgimvfuiy5xgonjkda26fqoe7cq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK columnDisplay;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE MULTI LINK columnsDisplay: sys_db::SysColumn;
  };
  ALTER TYPE sys_core::SysDataObjFieldLinkJoinColumn RENAME TO sys_core::SysDataObjFieldLinkJoin;
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK tabColsAncestors {
          RENAME TO joins;
      };
  };
};
