CREATE MIGRATION m1m5wfasna5w2qd3t7hwawwd42h7xlbskzpndraemcnuwmgoq2ufba
    ONTO m13ae3644hkssrrgnz4eaws7ebt562gdl2chegszf4j7grujq66qaa
{
  ALTER TYPE default::Person {
      ALTER PROPERTY avatar {
          SET TYPE std::json USING (<std::json>.avatar);
      };
  };
};
