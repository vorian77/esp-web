CREATE MIGRATION m16kevrc4z2vlok7twbjfjckxdjjpnutg27culshel4vfwfchwxdxa
    ONTO m1xxsfgjof4hz5zfsuqgkncshz7ggtqjcmd655ebsme66jwxcpocrq
{
  ALTER TYPE sys_user::User {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
  };
  ALTER TYPE sys_user::User {
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
};
