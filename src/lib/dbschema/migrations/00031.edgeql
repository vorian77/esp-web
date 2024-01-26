CREATE MIGRATION m1inzkcokbknn5zu2ut3zvnywb6kxhmd7zcgysc5k3k6mjg36opvbq
    ONTO m1wawp3w2qdw26skwivpeigfutevpxn6jewhyhapcqjyrtigkqmt6a
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK tabColsAncestors;
      DROP LINK tabColsDisplay;
  };
  DROP TYPE sys_core::SysDataObjFieldLinkTabCol;
};
