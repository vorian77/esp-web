CREATE MIGRATION m1eanzx2e4gcpg3o5yghlf56dqxpg4pyqxkqloymhzctohaeyeijdq
    ONTO m1oykd23w4w7k53lulqjdedcp4zctisgmxo6d6ycxdeznxc4uuf4aa
{
  ALTER TYPE sys_core::SysOverlayNode {
      DROP PROPERTY isMultiSelect;
  };
};
