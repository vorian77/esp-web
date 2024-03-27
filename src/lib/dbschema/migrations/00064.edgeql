CREATE MIGRATION m1eezpkurg44kg3zhnluy7dffghwkmr62q3ygiibye6odfyzpeiaoq
    ONTO m1y2eyis4tqjidtoo3p52dcdit5n5z2326yrgeza4h5heiu74rbr6q
{
  CREATE TYPE sys_core::SysOverlayNode EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK codeType: sys_core::SysCode;
      CREATE REQUIRED LINK dataObj: sys_core::SysDataObj;
      CREATE PROPERTY btnLabelCompelte: std::str;
      CREATE PROPERTY isMultiSelect: std::bool;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK overlayNode: sys_core::SysOverlayNode;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY chipsHeader;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY chipsHeaderSub;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY chipsSelectMulti;
  };
};
