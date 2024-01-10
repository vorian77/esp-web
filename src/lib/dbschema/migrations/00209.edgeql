CREATE MIGRATION m1z43zkuh4ry3ugijyu2vjtgosr64jnm3ncj42dj5qnz4xfxudovhq
    ONTO m1euennspu2p23mbevppphhc7wx257eje5i53ucy3ki5g5zxv7sd6a
{
  ALTER TYPE sys_user::UserRoot {
      CREATE REQUIRED LINK person: default::Person {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
          SET REQUIRED USING (<default::Person>{});
      };
  };
  ALTER TYPE sys_user::User {
      ALTER LINK person {
          RESET CARDINALITY;
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
