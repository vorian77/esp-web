CREATE MIGRATION m1lusm2ixzrlegggzsvoq3dfpvdjatrrpgt7p7h5qtggwcg2x2je4a
    ONTO m1uwmxqqekrfvovnwlodqtlomrqg6kpieokwhi6gyflenvbt4irzva
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprPreset: std::str;
  };
};
