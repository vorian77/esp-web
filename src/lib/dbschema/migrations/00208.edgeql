CREATE MIGRATION m1euennspu2p23mbevppphhc7wx257eje5i53ucy3ki5g5zxv7sd6a
    ONTO m1krg2dcqtruru34twbntg7ivndyxxd6q64lj3btwduatsy32indla
{
  ALTER TYPE sys_user::User {
      ALTER LINK person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          RESET readonly;
          RESET CARDINALITY;
          SET REQUIRED;
          SET OWNED;
          SET TYPE default::Person;
      };
  };
  ALTER TYPE sys_user::UserRoot {
      DROP LINK person;
  };
};
