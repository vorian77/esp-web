CREATE MIGRATION m1bca2ggsm6g4pohfdx7ekmg5lkpukyvpholzvytmc3adrfceo6ahq
    ONTO m1p5ablqigsy2mtw2qjdimjbn4w5ywmryet3atvssmglgeqae5rara
{
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      ALTER LINK dataObj {
          RENAME TO dataObjDisplay;
      };
  };
};
