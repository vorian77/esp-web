CREATE MIGRATION m1kcqqrt4lp2qizjtbetn353aqksnks4ukxwz4xtebwhhwjkjms4tq
    ONTO m1fervokg3cf6mgvvxpdp7qrivo4d6dx3cnolznwzzyuhkhe77lyda
{
  ALTER TYPE default::Person {
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY birthDate: cal::local_date;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY ethnicity: std::int32;
      CREATE PROPERTY gender: std::int32;
      CREATE PROPERTY note: std::str;
      CREATE PROPERTY phoneMobile: std::str;
      CREATE PROPERTY race: std::int32;
      CREATE PROPERTY state: std::int32;
      CREATE PROPERTY zip: std::str;
  };
};
