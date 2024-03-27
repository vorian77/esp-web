CREATE MIGRATION m1eq6f3jiapbtkunlsynvzk3ga745gfav636t5ge4sxyndu5jjthda
    ONTO m1n4way6kgmbcdquorlalw4gencit2zxhr7w7o3nzhfwrx3wp4dq6q
{
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED LINK codeJobType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED LINK codePlacementRelated: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED LINK codeWageType: sys_core::SysCode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
  CREATE TYPE app_cm::CmEmployer EXTENDING sys_core::SysOrg {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
      CREATE LINK contact: default::SysPerson;
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED LINK employer: app_cm::CmEmployer {
          SET REQUIRED USING (<app_cm::CmEmployer>{});
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED LINK staffAgency: sys_user::SysStaff {
          SET REQUIRED USING (<sys_user::SysStaff>{});
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      ALTER PROPERTY date {
          RENAME TO dateStart;
      };
  };
  ALTER TYPE app_cm::CmCsfJobPlacement {
      CREATE REQUIRED PROPERTY dateSubmitted: cal::local_date {
          SET REQUIRED USING (<cal::local_date>{});
      };
      CREATE REQUIRED PROPERTY hoursPerWeek: std::float32 {
          SET REQUIRED USING (<std::float32>{});
      };
      CREATE REQUIRED PROPERTY title: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE PROPERTY wage: std::float32;
  };
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY title: std::str;
  };
};
