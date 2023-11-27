CREATE MIGRATION m1cwdfodwpkgpqndh7vx3jjwsqlng375sz5mlkkkqismuztgjitrxa
    ONTO m1lx7sbi5c4ltfrfwcf6kmhrchhjhpwcigia7ue7ukmnzi734xmbiq
{
  ALTER TYPE app_cm_training::Course {
      CREATE LINK codeStatus: sys_core::Code;
  };
};
