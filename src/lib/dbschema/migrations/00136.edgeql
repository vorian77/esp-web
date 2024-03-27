CREATE MIGRATION m1wjknvb4dicnuuh5rggrrvlynszrrjt46nizmknbaev6mkfanwqiq
    ONTO m1b6az7dj6hmizxeqqd6rvstnclxsw7ky3l2fga74sb277qpmtnljq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK tables {
          ON TARGET DELETE ALLOW;
      };
  };
};
