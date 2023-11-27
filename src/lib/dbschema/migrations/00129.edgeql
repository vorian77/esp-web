CREATE MIGRATION m12mkwgqftvwncnqb6hwnhxnowewkhwc3okspldjip2hztbkuwjs3q
    ONTO m1orkk4gqiftfxelqdvqbooiwoqxydwjohfghdj3rk2vjjwa67rnna
{
  ALTER TYPE sys_core::Ent {
      ALTER LINK roles {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
