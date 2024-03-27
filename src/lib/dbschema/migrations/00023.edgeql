CREATE MIGRATION m1uczw6wo46pogzwjmrbbhp5ovndubyjjey7k3ibspzoxzd6de5raq
    ONTO m1lcbv2yxzqd2jt7fcov4b4b2k5lnp5r2uq52rd5vc7isscg5c67fq
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK tabColDisplay;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE MULTI LINK tabColDisplayDisplay: sys_core::SysDataObjFieldLinkTabCol;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK table;
  };
  ALTER TYPE sys_core::SysDataObjFieldLinkTabCol {
      CREATE REQUIRED PROPERTY order: default::nonNegative {
          SET REQUIRED USING (<default::nonNegative>{});
      };
  };
};
