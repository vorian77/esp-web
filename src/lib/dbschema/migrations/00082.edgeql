CREATE MIGRATION m1empvp6xi73lvmr4bvil2tzdbwgzw6z4z4ejrispq3rxoyk5xkswa
    ONTO m1t6vjlcipm4qh337rpus543wvayyy4i4vxogr5vfnmrj35hxiau6a
{
  ALTER TYPE app_cm::CmCsfDocument {
      ALTER PROPERTY isShareWithStudent {
          RENAME TO isShareWithClient;
      };
  };
};
