CREATE MIGRATION m1na64umj3gjnlznfjmkwjayxxx7orqfvncetm264s5aeajimw6qea
    ONTO m1d2kouqd4nnx6tss2jaglax2mwbkam2ttaczq5pk3bddzleerzmxq
{
  CREATE TYPE sys_core::SysDataObjFieldListSelect EXTENDING sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON (.name);
      CREATE REQUIRED LINK dataObj: sys_core::SysDataObj {
          ON SOURCE DELETE DELETE TARGET;
      };
      CREATE REQUIRED PROPERTY btnLabelComplete: std::str;
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool;
  };
};
