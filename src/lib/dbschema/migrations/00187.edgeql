CREATE MIGRATION m16kf3yakrwykynvgygn3w5yiaa5ntnehmh5wuapwjdfcometpoboq
    ONTO m1owyzot2a2kxuc5au55omyinywbqmgblfkfvfy32korvbptbihnfa
{
  ALTER TYPE app_cm::ClientData RENAME TO app_cm::CsfData;
  ALTER TYPE app_cm::ClientNote {
      DROP LINK codeType;
  };
  ALTER TYPE app_cm::ClientNote RENAME TO app_cm::CsfNote;
  ALTER TYPE app_cm::CsfNote {
      ALTER LINK codePrivacy {
          RENAME TO codeType;
      };
  };
};
