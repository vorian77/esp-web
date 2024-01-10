CREATE MIGRATION m14ikqamqqbzfggutnt65vba4jhtopzhizaovg772kvulzsbur5r2a
    ONTO m1wx65pfytiqjpkf4kelef7dxzqqxvvzfwqefrmdioglhgigwjax3a
{
  CREATE TYPE sys_user::UserRoot {
      CREATE REQUIRED PROPERTY userName: std::str;
      CREATE CONSTRAINT std::exclusive ON (.userName);
  };
  ALTER TYPE sys_user::User {
      EXTENDING sys_user::UserRoot LAST;
      ALTER PROPERTY userName {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_user::Mgmt {
      ALTER LINK createdBy {
          SET TYPE sys_user::UserRoot;
      };
      ALTER LINK modifiedBy {
          SET TYPE sys_user::UserRoot;
      };
  };
  ALTER TYPE sys_user::User {
      ALTER PROPERTY userName {
          DROP OWNED;
          RESET TYPE;
      };
  };
};
