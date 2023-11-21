CREATE MIGRATION m1mcwjeypxgz2zzoev5uexjrorxyi3r6nkeo2z3w7e5y3w3bu2vsfa
    ONTO m1yegd5w3ep7oggisabef5gyhuvxg2q52viubelh3c3tx6febf7kga
{
  ALTER TYPE default::Person {
      CREATE PROPERTY avatar: std::str;
  };
};
