CREATE MIGRATION m1zxxsletjqiye74qd4sdgkolya26svfvozvln4kcaab6vn2cagwma
    ONTO m1mn6dfqymi33tsh2gvjnlx3l6jh467m6tihb2mxm6zkim2npq2i2a
{
  ALTER TYPE sys_core::Ent {
      DROP LINK roles;
  };
};
