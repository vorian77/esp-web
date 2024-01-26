CREATE MIGRATION m133axp4biq2zjz27xkpf2smbhkpt35agnwaco7hgptlxpaif75kkq
    ONTO m17hohapwpb7fta3rordxgkmb2xkatz76k4qhwdb2wzultgvszjb6a
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      DROP LINK codeDisplayType;
  };
};
