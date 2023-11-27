CREATE MIGRATION m1lx7sbi5c4ltfrfwcf6kmhrchhjhpwcigia7ue7ukmnzi734xmbiq
    ONTO m143rdhnxvcaytymnh5ph3gbcl3bkube3c6ew6e4nqetqb3zuk7ekq
{
  ALTER TYPE sys_core::Code {
      ALTER PROPERTY valueInt {
          RENAME TO valueInteger;
      };
  };
  ALTER TYPE sys_core::Code {
      ALTER PROPERTY valueStr {
          RENAME TO valueString;
      };
  };
};
