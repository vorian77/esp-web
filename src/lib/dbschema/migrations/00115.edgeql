CREATE MIGRATION m16zoi2wkwgbmv7kaqlym47x3j2vaepvtohcndh3sd5xpw3zr6slta
    ONTO m1nxy3q4s5gqddjzefcmu3sx5ezdwmx36c5dqw6ir7bi2geb4dzdzq
{
  CREATE FUNCTION sys_core::getOrg(name: std::str) -> OPTIONAL sys_core::Org USING (SELECT
      sys_core::Org
  FILTER
      (.name = name)
  );
};
