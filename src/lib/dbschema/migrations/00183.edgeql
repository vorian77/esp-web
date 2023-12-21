CREATE MIGRATION m1hows3ugfuadz4tua53zwgx5ojm2qry35h2zncou3jcqhgs3b2ija
    ONTO m13ioumroo2uirukrf43njqm4gazcuuglrxvwkyl6it57lcbyjqwqq
{
  ALTER TYPE sys_obj::DataObj {
      ALTER LINK codeRenderType {
          SET REQUIRED USING (<sys_core::Code>{});
      };
  };
};
