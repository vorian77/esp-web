CREATE MIGRATION m1ka2vtskjtdg24ivufus4x3y73yw52lmqw7itg4jacj3ghno5osga
    ONTO m1h2bq6zbwnu2rckxeeccei7drqbiurx7gqygpas3npzcy335qtvzq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY lastName {
          SET REQUIRED USING (<default::Name>{});
      };
  };
};
