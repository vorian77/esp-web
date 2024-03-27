CREATE MIGRATION m1g2ghd4n5q334wz4g5jqlxquxsa45mpdukjrjywh6qflomhpy2uoq
    ONTO m1kttkwexmwjygfwjoni4md3sg4xvegejjhrcqmvohp7ljdx34foeq
{
  ALTER TYPE app_cm::CmCohortAttd {
      ALTER PROPERTY duration {
          RENAME TO hours;
      };
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY duration {
          RENAME TO hours;
      };
  };
};
