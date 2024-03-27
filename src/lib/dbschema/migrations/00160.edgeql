CREATE MIGRATION m1aq4345zplqjeek65e6vbahjpctw3yjwhxylzmpw5gu2dvvfthiza
    ONTO m1djetfjfmrlmw6gxt4ov52dn2abgsqifs27cpq6ocyivlq73znhoq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY exprOrder: std::str;
  };
};
