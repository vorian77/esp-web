CREATE MIGRATION m1kgunkniyngin3zf64ng2jfierjqsgwjxtwfnjvcj7fcolae5keta
    ONTO m1nm3kkzbbqsqehuuzqiuybnojagh6zntds4inkjmuk7i4nvmjrg4a
{
  ALTER TYPE app_cm::CmCohortAttd {
      CREATE PROPERTY file: std::json;
  };
  ALTER TYPE app_cm::CmCohortAttd {
      DROP PROPERTY note;
  };
};
