CREATE MIGRATION m1o5xtqfsmicdevsqm66iijnpgzjdjqaj3apwnmczthrxpc564nika
    ONTO m1wnfi6dipivimy2kao2yharcpdb6yfh6orqbj3oihl7jtnluu3eya
{
  ALTER TYPE app_cm_training::Course {
      CREATE PROPERTY isActive: std::int16;
  };
};
