CREATE MIGRATION m1mndui7uhe4yc3ag3qbnpiked64lneobfpeum33ukncqun7fdgalq
    ONTO m1nanm3ubk4v4k64oy3naifd34budb6o4ynynjzo6u4occ6xqfzaga
{
  ALTER TYPE sys_core::Ent {
      ALTER LINK roles {
          ON SOURCE DELETE ALLOW;
          RESET ON TARGET DELETE;
      };
  };
};
