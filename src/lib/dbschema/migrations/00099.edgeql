CREATE MIGRATION m1d2kouqd4nnx6tss2jaglax2mwbkam2ttaczq5pk3bddzleerzmxq
    ONTO m1ct6cfy36ynmu3jflg2wsv4ow7mfled3js62kfl3jxb25j7sxw5ca
{
  ALTER TYPE sys_core::SysDataObjFieldListChips {
      DROP PROPERTY headerSub;
  };
};
