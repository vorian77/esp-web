CREATE MIGRATION m1qpl2my6a6662ex45tbtpxijet4c55ltfunozmp33z65ahendkkqq
    ONTO m1hrbu6myaogtlmtszlhznpkb6qofckaakx2miqa5br277l47yly6a
{
  ALTER TYPE sys_core::Org {
      DROP PROPERTY appName;
  };
};
