CREATE MIGRATION m1t6vjlcipm4qh337rpus543wvayyy4i4vxogr5vfnmrj35hxiau6a
    ONTO m1y2ffnmbaomub52ululfettcsqbyxh6hur3ojla3aosr3pfyhm7ya
{
  ALTER TYPE app_cm::CmCsfDocument {
      DROP LINK codeCategory;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY description;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      CREATE PROPERTY isShareWithStudent: std::bool;
  };
  ALTER TYPE app_cm::CmCsfDocument {
      DROP PROPERTY other;
  };
};
