CREATE MIGRATION m1fervokg3cf6mgvvxpdp7qrivo4d6dx3cnolznwzzyuhkhe77lyda
    ONTO m1wogqr6bgujlh6wx2fapk234lx6fesafqxy3ejfeojptpyw3slrja
{
  ALTER TYPE app_cm::Student {
      DROP PROPERTY email;
      DROP PROPERTY note;
  };
};
