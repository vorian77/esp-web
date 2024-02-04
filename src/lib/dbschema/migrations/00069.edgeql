CREATE MIGRATION m1zukpptngc5o5t3mwkvnrongqj632nhnep6m47h4unnsfc3qxr65a
    ONTO m1hcaxtvoogai3xt2igsv7gs2667eq7mdnbbsueyt76dwrgb2g5a5q
{
  DROP FUNCTION sys_core::getOverlayNode(overlayNodeName: std::str);
  CREATE TYPE sys_core::SysOverlayNodeFieldItems EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED PROPERTY btnLabelComplete: std::str;
      CREATE REQUIRED PROPERTY columnLabelDisplay: std::str;
      CREATE PROPERTY headerSub: std::str;
  };
  CREATE FUNCTION sys_core::getOverlayNodeItems(name: std::str) -> OPTIONAL sys_core::SysOverlayNodeFieldItems USING (SELECT
      sys_core::SysOverlayNodeFieldItems
  FILTER
      (.name = name)
  );
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK overlayNode;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK overlayNodeItems: sys_core::SysOverlayNodeFieldItems;
  };
  DROP TYPE sys_core::SysOverlayNode;
};
