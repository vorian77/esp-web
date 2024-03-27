CREATE MIGRATION m1kzmhlyiaubbmjsatrffaxte5bw2wzf2quwi3lmwbtk5eilvs6pla
    ONTO m1wvgvmqz7n74hwreu2rr3vtmxgkpfnwakytrizly2jykbeljae5xa
{
  ALTER TYPE app_cm::CmClient {
      CREATE PROPERTY school: std::str;
  };
  ALTER TYPE default::SysPerson {
      CREATE PROPERTY middleName: default::Name;
  };
};
