CREATE MIGRATION m1g6pf4n267kflcs2qer5spgv2heiyut352xs4e3duqdwuuhpvzcwq
    ONTO m1na64umj3gjnlznfjmkwjayxxx7orqfvncetm264s5aeajimw6qea
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE LINK fieldListSelect: sys_core::SysDataObjFieldListSelect {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
