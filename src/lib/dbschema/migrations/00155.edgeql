CREATE MIGRATION m1d2gih6mc5a3gmfvwq54nj7lvpzzgrbsw36nz6f6wtxmwugdksn5a
    ONTO m1g2ghd4n5q334wz4g5jqlxquxsa45mpdukjrjywh6qflomhpy2uoq
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER LINK codeCmCohortAttdDuration {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
