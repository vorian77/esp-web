CREATE MIGRATION m15agcku64diu6acvmocgklklr7lmn42m2rv3a4hlfslvz5vih675q
    ONTO m1wjknvb4dicnuuh5rggrrvlynszrrjt46nizmknbaev6mkfanwqiq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE LINK tableParent: sys_core::SysDataObjTable;
  };
};
