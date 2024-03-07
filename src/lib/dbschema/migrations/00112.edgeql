CREATE MIGRATION m1tkp7l45lt4htsxv74fnopaqmve4ksalmififu46utqvzmgkhp7sq
    ONTO m1n4vf372adsklo2rnabxxxfop3hlk7u4ejnfcxt4zapndnnbmzqna
{
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE LINK actionType: sys_core::SysCode;
      CREATE PROPERTY checkObjChanged: std::bool;
  };
};
