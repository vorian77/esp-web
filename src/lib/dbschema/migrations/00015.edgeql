CREATE MIGRATION m1x2gpac2fckzlefz73le3svksneahpss63yyqxw7kbbk5y7dbp22q
    ONTO m1gsn3mfl6s6wpsm3ziqia3qaqdbwmxf3ezpieioqel3zvetr5g5hq
{
  CREATE MODULE app_cm IF NOT EXISTS;
  ALTER TYPE app_cm_training::Student RENAME TO app_cm::Student;
  DROP MODULE app_cm_training;
};
