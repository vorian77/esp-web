CREATE MIGRATION m13togdfcjzmxwamqgrr2c3qpcz6dfcqg3yksefhawlknagz2774za
    ONTO m1kvcrb7g2yequ6arz4sylre3dbd4lnqivabqagbcf4opzekp25ytq
{
  ALTER TYPE default::Person RESET ABSTRACT;
  ALTER TYPE sys_user::User {
      CREATE LINK createdBy: default::Person {
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE sys_user::User {
      CREATE LINK modifiedBy: default::Person {
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE sys_user::User {
      CREATE REQUIRED LINK person: default::Person {
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE sys_user::User {
      DROP EXTENDING default::Person;
      EXTENDING default::Mgmt LAST;
      ALTER LINK createdBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      ALTER LINK modifiedBy {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE sys_user::User {
      ALTER LINK userTypes {
          DROP PROPERTY isActive;
      };
  };
};
