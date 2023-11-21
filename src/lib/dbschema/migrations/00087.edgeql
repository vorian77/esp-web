CREATE MIGRATION m17aryvorhexq27symzvz6wzsgcg3y5mtqiajqelenakadu6ea4ypa
    ONTO m1g3b2asy7bggtaafqe7c4bboqjif3nmfwe5tohlfbeznxxxzqxrfq
{
  ALTER TYPE app_cm::Student {
      CREATE REQUIRED LINK owner: sys_core::ObjRoot {
          SET REQUIRED USING (<sys_core::ObjRoot>{});
      };
  };
  ALTER TYPE app_cm::Student {
      CREATE REQUIRED LINK person: default::Person {
          ON TARGET DELETE ALLOW;
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE app_cm::Student DROP EXTENDING default::Person;
  ALTER TYPE sys_user::User {
      ALTER LINK owner {
          SET REQUIRED USING (<sys_core::ObjRoot>{});
      };
  };
};
