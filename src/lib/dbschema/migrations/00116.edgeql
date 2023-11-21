CREATE MIGRATION m13ae3644hkssrrgnz4eaws7ebt562gdl2chegszf4j7grujq66qaa
    ONTO m16zoi2wkwgbmv7kaqlym47x3j2vaepvtohcndh3sd5xpw3zr6slta
{
  ALTER TYPE default::Person {
      CREATE LINK codeState: sys_core::Code;
  };
  ALTER TYPE default::Person {
      ALTER LINK race {
          RENAME TO codeRace;
      };
  };
  ALTER TYPE default::Person {
      DROP PROPERTY state;
  };
};
