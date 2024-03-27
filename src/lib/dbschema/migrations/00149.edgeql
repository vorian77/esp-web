CREATE MIGRATION m1s6tvecv7ltirqtkd255vzgsxcxgrepr7hsvn5veokh4fxy7irsha
    ONTO m1fh633kmk4akhhl53lgx7dh56otoeohm4h4h76osoba52datn7mzq
{
  ALTER TYPE app_cm::CmCsfCohortAttd {
      ALTER PROPERTY fullDuration {
          SET TYPE std::str USING (<std::str>.fullDuration);
      };
  };
};
