CREATE MIGRATION m1feznv7vn3x2jtyw7oraoln22zrw5afmgmeayf6pii3q3t2p3y2jq
    ONTO m1pqgu4mxfok4e54eytai4c7dh6udkfrqlkyob75s4gcjjihzyt6eq
{
  DROP FUNCTION sys_core::getDataObjFieldListChips(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK fieldListChips;
  };
  DROP TYPE sys_core::SysDataObjFieldListChips;
};
