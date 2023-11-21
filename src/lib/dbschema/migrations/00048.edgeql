CREATE MIGRATION m1javkof7wifbhvvygfrasvigfwfrggm24rdpeu24g6kv3b3aczehq
    ONTO m1axrbtcg7ekp5brx4vtslxiichwk4xufbarqanhedh7sh7qybeklq
{
  ALTER TYPE app_cm_training::Course {
      CREATE REQUIRED PROPERTY isActive: std::int16 {
          SET REQUIRED USING (<std::int16>{1});
      };
  };
};
