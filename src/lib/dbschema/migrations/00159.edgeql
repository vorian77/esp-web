CREATE MIGRATION m1djetfjfmrlmw6gxt4ov52dn2abgsqifs27cpq6ocyivlq73znhoq
    ONTO m1kgwx2oduef7ods5cg2tc2kprj7dzcwnut3gxucr6tuymskuq66oa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isDisplayBlock: std::bool;
  };
};
