CREATE MIGRATION m17woc2cya6uesdqfiaw7d3vd2nbaxy2jxijaftrvpu4tmjoyfsmaq
    ONTO m1vuzjjy2nx247e5ms3j2opz3cionwjq34qo6nudltvbbnhhdzra2q
{
  ALTER TYPE app_cm::CmCsfCohort {
      DROP LINK codeMultiCerts;
  };
};
