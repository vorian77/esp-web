CREATE MIGRATION m13jcgranvc2pmby7cqasyvdbms7gyuhq3rjsl5fymjzul4jtk6ktq
    ONTO m1g6pf4n267kflcs2qer5spgv2heiyut352xs4e3duqdwuuhpvzcwq
{
  ALTER TYPE sys_core::SysDataObjFieldListChips {
      ALTER LINK dataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      ALTER LINK dataObj {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
