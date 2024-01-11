CREATE MIGRATION m1mqv2pz763iwdud43kokbj7jdg6j4ontengduzfu75o3mcmjwsn5a
    ONTO m1bk7555qbee6mhxxvmhmtohp5z5lb2qmlhlx2h6hivacu3e2pbyaq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY spinStep: std::str;
  };
};
