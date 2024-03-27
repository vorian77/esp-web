CREATE MIGRATION m1lcbv2yxzqd2jt7fcov4b4b2k5lnp5r2uq52rd5vc7isscg5c67fq
    ONTO m1ehpjzxgk4rbnzdadvczeygcbgd5r5zphte5pvoidpbdgmjx7gxuq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK columnDisplay;
  };
  ALTER TYPE sys_core::SysDataObjSubTable RENAME TO sys_core::SysDataObjFieldLinkTabCol;
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE MULTI LINK tabColAncestors: sys_core::SysDataObjFieldLinkTabCol;
      CREATE LINK tabColDisplay: sys_core::SysDataObjFieldLinkTabCol;
  };
};
