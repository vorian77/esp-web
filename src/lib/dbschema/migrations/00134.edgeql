CREATE MIGRATION m1424b4h6ysieek5kxekxbwa3oe3e2fdlfxb52ehkakmbcqsfyefca
    ONTO m1mndui7uhe4yc3ag3qbnpiked64lneobfpeum33ukncqun7fdgalq
{
  ALTER TYPE sys_core::Ent {
      DROP LINK roles;
  };
};
