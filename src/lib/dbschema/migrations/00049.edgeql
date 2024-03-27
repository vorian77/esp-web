CREATE MIGRATION m1jljnjmv3chugy2lovbamdotpxl5ahjjb24vf3oypi7r64s2rfnua
    ONTO m1zzr77wqvtuepdr5ytueg3337rnckvgacjs5jvp7ar7f3ivpby3oq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK columns {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
