CREATE MIGRATION m1qntsbrk4q6hfntezeywctk5obnmiwo5hbrdjyrg6o2omcthfqx6q
    ONTO m1zt5kpn4kov4hqk23seexzh2uofidrcqrjcp4a5trp7d6d7qqkqqa
{
  ALTER TYPE app_cm_training::Course {
      ALTER PROPERTY isActive {
          SET TYPE std::bool USING (<std::bool>.isActive);
      };
  };
};
