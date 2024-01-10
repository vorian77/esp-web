CREATE MIGRATION m1kjder5obrtyq6juibwm4ks7gdpkrs7djidt4m4nkd55i3jkrt2ua
    ONTO m1lmq3izp6t7acnx3mpb7kaolwezkre76hm3wcytpshvfxftguvs7q
{
  CREATE FUNCTION sys_user::getUserOrgs(userName: std::str) -> SET OF sys_core::Org USING (SELECT
      sys_core::Org
  );
};
