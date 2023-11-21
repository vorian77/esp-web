CREATE MIGRATION m1csbg3ztodw4jzpztvexlpflysbsrwy7lydqzec6cttycksy4lswq
    ONTO m1qntsbrk4q6hfntezeywctk5obnmiwo5hbrdjyrg6o2omcthfqx6q
{
  ALTER TYPE app_cm_training::Course {
      CREATE REQUIRED LINK codeSector: sys_core::Code {
          SET REQUIRED USING (<sys_core::Code>{});
      };
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY codeCategory;
  };
  CREATE TYPE sys_core::Org EXTENDING sys_core::Ent {
      CREATE LINK state: sys_core::CodeType;
      CREATE PROPERTY addr1: std::str;
      CREATE PROPERTY addr2: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY zip: std::str;
  };
  CREATE TYPE sys_core::Venue EXTENDING sys_core::Org;
};
