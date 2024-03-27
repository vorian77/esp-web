CREATE MIGRATION m1227u3pn7j62lakhezp2wq2sloekgwmemhm52jorerkgfcyceefxa
    ONTO m1xwajey4vjpnk3jfnvdwmmx76r3x3uvugyw2pdvgokcbyjdlrdqga
{
  CREATE FUNCTION sys_core::getDataObjFieldListConfig(name: std::str) -> OPTIONAL sys_core::SysDataObjFieldListConfig USING (SELECT
      sys_core::SysDataObjFieldListConfig
  FILTER
      (.name = name)
  );
};
