CREATE MIGRATION m1sxxzpplam7hop2stql6yjtpzrxrbqncq6ylaxtxxhx4wdr2y36qq
    ONTO m1w374xsjvzycxdtyi3fel2hoxkt6gdicbxrafpbapt3ok2tjvg2cq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK actions {
          RENAME TO actionsField;
      };
  };
};
