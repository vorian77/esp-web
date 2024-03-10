CREATE MIGRATION m1jmb5pclgo3esvxfx274y6wa55emfxnefj6xmjcgit5urh6tgnpfq
    ONTO m1bpvagz4i35szblp5ayiimkexpukvarok432dolfjr3drlntgmyna
{
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE LINK codeRenderShowSaveMode: sys_core::SysCode;
      CREATE PROPERTY isRenderDisableOnInvalidToSave: std::bool;
  };
};
