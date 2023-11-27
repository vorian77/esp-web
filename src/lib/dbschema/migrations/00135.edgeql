CREATE MIGRATION m1hoztq6fmnvbnlsaspj3p5f6u4sxhvwlyatv4uclvjs7q5rklpvha
    ONTO m1424b4h6ysieek5kxekxbwa3oe3e2fdlfxb52ehkakmbcqsfyefca
{
  ALTER TYPE sys_core::Ent {
      CREATE MULTI LINK roles: sys_core::Code {
          ON TARGET DELETE ALLOW;
      };
  };
};
