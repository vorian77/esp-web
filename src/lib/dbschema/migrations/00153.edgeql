CREATE MIGRATION m1kttkwexmwjygfwjoni4md3sg4xvegejjhrcqmvohp7ljdx34foeq
    ONTO m1f7pced7a66ruuo2gzr5vlbarxqet2zq3us4rz2t6k3mn34vcmhla
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER LINK codeCmCohortAttd {
          RENAME TO codeCmCohortAttdDuration;
      };
  };
};
