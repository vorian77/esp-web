CREATE MIGRATION m1yyazp7j32ptgvoinwzoxxeslhjpcwjxayuk3srrwcziwrjcatzca
    ONTO m1upoxatrpnvahbhterfu7suzm2ehcvqrgqb7fr6pfuppdovsa4yvq
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE REQUIRED LINK cohortAttd: app_cm::CmCohortAttd {
          SET REQUIRED USING (<app_cm::CmCohortAttd>{});
      };
  };
};
