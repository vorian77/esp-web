CREATE MIGRATION m1h2bq6zbwnu2rckxeeccei7drqbiurx7gqygpas3npzcy335qtvzq
    ONTO m1s2prwbsdypvyg67hej6cqodwfdevi2luu43otteax4m6guh65vma
{
  ALTER TYPE default::Person {
      ALTER PROPERTY firstName {
          SET REQUIRED USING (<default::Name>{});
      };
  };
  ALTER TYPE default::Person {
      DROP PROPERTY fullName;
  };
};
