CREATE MIGRATION m1zzr77wqvtuepdr5ytueg3337rnckvgacjs5jvp7ar7f3ivpby3oq
    ONTO m1ujzo74k5avjjhla3ygnyicesmasqmbz2jo3vrnfnopldp2bhjtna
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK columns: sys_core::SysDataObjColumn;
  };
};
