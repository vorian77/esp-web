CREATE MIGRATION m1bh35f6pqbnzqql6q27kudx7ayy3mgwdqes4ihvqpviwgvcxubhka
    ONTO m1alafu3gqo4ldsqktdafa374qbgosjuienyv4faoxmbshcqanckxq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY avatar {
          SET TYPE std::str USING (<std::str>.avatar);
      };
  };
};
