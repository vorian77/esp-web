CREATE MIGRATION m1bk7555qbee6mhxxvmhmtohp5z5lb2qmlhlx2h6hivacu3e2pbyaq
    ONTO m1jf3c5tv3yyjelybhrou4ymidtmjbctkeyjm2h5m3sc3tb6r5ttba
{
  ALTER TYPE app_cm_training::CsfCohortAttd {
      CREATE LINK createdBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      CREATE LINK modifiedBy: sys_user::UserRoot {
          SET REQUIRED USING (<sys_user::UserRoot>{});
      };
      EXTENDING sys_user::Mgmt LAST;
      ALTER PROPERTY duration {
          SET TYPE std::float32 USING (<std::float32>.duration);
      };
  };
  ALTER TYPE app_cm_training::CsfCohortAttd {
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
