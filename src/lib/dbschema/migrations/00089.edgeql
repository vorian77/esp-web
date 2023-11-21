CREATE MIGRATION m12eut4afc4wdemethgcqtqjbvi5366rydq4ls3qhcemmixxy5cx3a
    ONTO m1ilnd3nce6xwofpucl4hkabfshu3p3bruptsmhyheimx5ur56uzlq
{
  ALTER TYPE sys_core::Obj {
      CREATE MULTI LINK roles: sys_core::Code;
  };
};
