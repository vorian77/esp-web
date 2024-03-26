CREATE MIGRATION m1nmwxcsmb53ls3lwng5i33yppmhai3ywil72h53vy3itwsduu2rma
    ONTO m1yyazp7j32ptgvoinwzoxxeslhjpcwjxayuk3srrwcziwrjcatzca
{
  ALTER TYPE app_cm::CmCohortAttd {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_user::Mgmt LAST;
  };
};
