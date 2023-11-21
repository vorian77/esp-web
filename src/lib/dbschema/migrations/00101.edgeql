CREATE MIGRATION m14w7tp3bobcxssyjuwkj2cz4hqx3owgz3bqxkf6lgezpfl3suoada
    ONTO m1jho2ldpcl3vdsg6veajzpf3ksbesixnyeloniec4kicjsgzh5hyq
{
  ALTER TYPE app_cm_training::Course {
      CREATE LINK staffAdmin: sys_user::Staff;
  };
  ALTER TYPE app_cm_training::Course {
      CREATE LINK staffAgency: sys_user::Staff;
  };
  ALTER TYPE app_cm_training::Course {
      DROP PROPERTY userContact;
  };
};
