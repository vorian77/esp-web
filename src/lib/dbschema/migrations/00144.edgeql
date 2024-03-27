CREATE MIGRATION m1upoxatrpnvahbhterfu7suzm2ehcvqrgqb7fr6pfuppdovsa4yvq
    ONTO m1kgunkniyngin3zf64ng2jfierjqsgwjxtwfnjvcj7fcolae5keta
{
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE PROPERTY note: std::str;
  };
};
