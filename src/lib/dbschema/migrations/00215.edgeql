CREATE MIGRATION m1uls6o4ih4nxefol7a665ae72dalmzyrynapq44tlymq3get6qzfa
    ONTO m1mqv2pz763iwdud43kokbj7jdg6j4ontengduzfu75o3mcmjwsn5a
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY maxValue {
          SET TYPE std::float64;
      };
      ALTER PROPERTY minValue {
          SET TYPE std::float64;
      };
  };
};
