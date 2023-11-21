CREATE MIGRATION m1i7pzg4xvversnlpozf5wpffwtj2vb5sonzv7jl2ph7oupmznynca
    ONTO m1yphcbyeb4cte7ijyjymesarwtnx2npvaoajqyazepta7qolx6zza
{
  CREATE TYPE app_cm::Student EXTENDING default::Person, default::Mgmt {
      CREATE REQUIRED PROPERTY agencyId: std::str;
  };
};
