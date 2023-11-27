CREATE MIGRATION m1orkk4gqiftfxelqdvqbooiwoqxydwjohfghdj3rk2vjjwa67rnna
    ONTO m1xh2v7zemourrdbg23wgkru4aiqsey6teatiu6vzj2ztn2lukks6a
{
  ALTER TYPE app_cm_training::Course {
      ALTER LINK staffProvider {
          RENAME TO staffAgency;
      };
  };
  ALTER TYPE app_cm_training::Section {
      CREATE LINK staffAdmin: sys_user::Staff;
  };
  ALTER TYPE app_cm_training::Section {
      CREATE LINK staffAgency: sys_user::Staff;
  };
  ALTER TYPE app_cm_training::Section {
      CREATE LINK staffInstructor: sys_user::Staff;
  };
  ALTER TYPE app_cm_training::Section {
      DROP LINK userInstructor;
  };
  ALTER TYPE app_cm_training::Section {
      CREATE LINK venue: sys_core::Org;
  };
  ALTER TYPE app_cm_training::Section {
      CREATE REQUIRED PROPERTY capacity: std::int16 {
          SET REQUIRED USING (<std::int16>{});
      };
  };
  ALTER TYPE app_cm_training::Section {
      DROP PROPERTY dateEnd;
  };
  ALTER TYPE app_cm_training::Section {
      DROP PROPERTY dateStart;
  };
  ALTER TYPE app_cm_training::Section {
      CREATE REQUIRED PROPERTY eventId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE app_cm_training::Section {
      CREATE REQUIRED PROPERTY isCohortRequired: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE PROPERTY schedule: std::str;
  };
};
