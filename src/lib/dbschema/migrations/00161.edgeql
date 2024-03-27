CREATE MIGRATION m1ba2vlcuuyax4hvnjifpdnahcdfkpnyaafo52uvbaz22htuiekbwq
    ONTO m1aq4345zplqjeek65e6vbahjpctw3yjwhxylzmpw5gu2dvvfthiza
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY exprOrder: std::str;
  };
};
