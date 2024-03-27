CREATE MIGRATION m1gk6rlxrw4kyms2fvlseemqdrxxf5vgdhauxkpzv5vbo4wso7p3wq
    ONTO m1i27p6ja4ltvxo3wfyeajb46ur3qiq45wsbg4simiplxgsigtdr2q
{
  ALTER TYPE sys_db::SysColumn {
      CREATE LINK codeLinkRenderType: sys_core::SysCode;
  };
};
