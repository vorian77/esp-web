CREATE MIGRATION m1hcaxtvoogai3xt2igsv7gs2667eq7mdnbbsueyt76dwrgb2g5a5q
    ONTO m1eanzx2e4gcpg3o5yghlf56dqxpg4pyqxkqloymhzctohaeyeijdq
{
  ALTER TYPE sys_core::SysOverlayNode {
      CREATE REQUIRED PROPERTY exprDisplay: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
