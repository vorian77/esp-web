CREATE MIGRATION m1tyzwehsoocsgmvjtunfhi3btliuhu65iiwwybm7lpkyvb2j4jnwq
    ONTO m1tnrwtoxhauuudln6w6pu5rz3grhjycgb3n3joovlymo6uexwnv5q
{
  ALTER TYPE app_cm::ClientServiceFlow {
      CREATE PROPERTY dateReferral: cal::local_date;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY exprSelect;
      DROP PROPERTY nameAlt;
  };
};
