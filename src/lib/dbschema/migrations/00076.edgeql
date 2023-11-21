CREATE MIGRATION m1yphcbyeb4cte7ijyjymesarwtnx2npvaoajqyazepta7qolx6zza
    ONTO m1ka2vtskjtdg24ivufus4x3y73yw52lmqw7itg4jacj3ghno5osga
{
  ALTER TYPE default::Person {
      CREATE PROPERTY fullName := (((.firstName ++ ' ') ++ .lastName));
  };
};
