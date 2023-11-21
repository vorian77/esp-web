CREATE MIGRATION m1sspc2wkzy7wblnr6xyukd65iiyja7r4nvuisxthwkmu5lipbh7yq
    ONTO m1ntv252vqpvbc7nluul7jyepkvcqbzxger3jsdma6fjyqkzs6ruaa
{
  ALTER TYPE app_cm::Student {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_user::Staff {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          RESET ON TARGET DELETE;
      };
  };
  ALTER TYPE sys_user::User {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          RESET ON TARGET DELETE;
      };
  };
};
