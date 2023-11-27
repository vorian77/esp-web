CREATE MIGRATION m1nanm3ubk4v4k64oy3naifd34budb6o4ynynjzo6u4occ6xqfzaga
    ONTO m1zxxsletjqiye74qd4sdgkolya26svfvozvln4kcaab6vn2cagwma
{
  ALTER TYPE sys_core::Ent {
      CREATE MULTI LINK roles: sys_core::Code {
          ON TARGET DELETE ALLOW;
      };
  };
};
