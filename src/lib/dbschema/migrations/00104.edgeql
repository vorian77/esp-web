CREATE MIGRATION m1qnjjianz6jcwldfju6eocxymlwxqabbanugorxr43u4wmhla6xha
    ONTO m1use27bzdibeho7juqoqa7sgr3wblqs5kcgubwjgqyhsizejcr55a
{
  CREATE FUNCTION sys_core::getDataObjFieldListSelect(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListSelect USING (SELECT
      sys_core::SysDataObjFieldListSelect
  FILTER
      (.name = name)
  );
};
