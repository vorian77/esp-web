CREATE MIGRATION m1mlnzvawsdm45ijmlggyzhng4rm3p6totrhbpxbucye2wnevnlgua
    ONTO m1zaxgkpacxr2hndx72fwl4izeekxbsvzohjwieejpadbxvuy2bdnq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK columnLink;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK tabColAncestors {
          RENAME TO tabColsAncestors;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK tabColDisplay {
          RENAME TO tabColsDisplay;
      };
  };
};
