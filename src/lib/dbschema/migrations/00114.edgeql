CREATE MIGRATION m1nxy3q4s5gqddjzefcmu3sx5ezdwmx36c5dqw6ir7bi2geb4dzdzq
    ONTO m13qdwk4cqd44uy5pce7brxkhwfu4nmn762rfu5clhg33ybjccif4a
{
  ALTER TYPE app_cm::Student {
      ALTER LINK owner {
          SET TYPE sys_core::Org USING (.owner[IS sys_core::Org]);
      };
  };
  ALTER TYPE default::Person {
      ALTER PROPERTY ethnicity {
          SET TYPE std::json USING (<std::json>.ethnicity);
      };
  };
};
