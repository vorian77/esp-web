CREATE MIGRATION m1alafu3gqo4ldsqktdafa374qbgosjuienyv4faoxmbshcqanckxq
    ONTO m1ck33zukfs6eb2kdhlu4emudwdiczautumirjfiqncclqy3gjitcq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY avatar {
          SET TYPE std::json USING (<std::json>.avatar);
      };
  };
};
