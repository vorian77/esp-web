CREATE MIGRATION m1krg2dcqtruru34twbntg7ivndyxxd6q64lj3btwduatsy32indla
    ONTO m1kjder5obrtyq6juibwm4ks7gdpkrs7djidt4m4nkd55i3jkrt2ua
{
  DROP FUNCTION sys_user::getUserOrgs(userName: std::str);
  ALTER TYPE sys_user::UserRoot {
      CREATE REQUIRED LINK person: default::Person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE sys_user::User {
      ALTER LINK person {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
