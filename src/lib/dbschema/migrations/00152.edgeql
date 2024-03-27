CREATE MIGRATION m1f7pced7a66ruuo2gzr5vlbarxqet2zq3us4rz2t6k3mn34vcmhla
    ONTO m1hjy3jf22kwswc4ywwaisyr62a7l4vyobbl4u3m3q3dlu56ffke5a
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      CREATE LINK codeCmCohortAttd: sys_core::SysCode;
      ALTER PROPERTY duration {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE app_cm::CmCsfCohortAttd {
      DROP PROPERTY fullDuration;
  };
};
