CREATE MIGRATION m1axrbtcg7ekp5brx4vtslxiichwk4xufbarqanhedh7sh7qybeklq
    ONTO m1gi6uidlwjze643f7vliu2mqaojwwbxuoyl3c27pzcs73zagi2qva
{
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY isActive;
  };
};
