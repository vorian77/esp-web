CREATE MIGRATION m1wnfi6dipivimy2kao2yharcpdb6yfh6orqbj3oihl7jtnluu3eya
    ONTO m1mz3dxgvp3bhhjnbnmx264dzwelirqy3qawjnur24ejexlffgp6tq
{
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY isActive;
  };
};
