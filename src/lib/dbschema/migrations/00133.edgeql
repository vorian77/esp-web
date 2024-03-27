CREATE MIGRATION m1p5ablqigsy2mtw2qjdimjbn4w5ywmryet3atvssmglgeqae5rara
    ONTO m1frktnrmamp6kosbm4b6fsw47otapoozx2pcgneqel7hf6eb5tvoa
{
  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      CREATE LINK actionsFieldGroup: sys_core::SysDataObjActionGroup {
          ON TARGET DELETE ALLOW;
      };
  };
};
