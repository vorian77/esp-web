CREATE MIGRATION m1pqgu4mxfok4e54eytai4c7dh6udkfrqlkyob75s4gcjjihzyt6eq
    ONTO m1jmb5pclgo3esvxfx274y6wa55emfxnefj6xmjcgit5urh6tgnpfq
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK codeRenderShowSaveMode {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
      ALTER PROPERTY isRenderDisableOnInvalidToSave {
          SET REQUIRED USING (<std::bool>{});
      };
      CREATE PROPERTY isRenderShowRequiresObjHasChanged: std::bool;
  };
};
