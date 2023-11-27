CREATE MIGRATION m1nup7neo7u7ulbdnsxtkpojwn5z2tvr7lzfi7yea5jengpqi7maqa
    ONTO m1o5xtqfsmicdevsqm66iijnpgzjdjqaj3apwnmczthrxpc564nika
{
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY isActive;
  };
};
