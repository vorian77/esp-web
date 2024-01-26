CREATE MIGRATION m1w374xsjvzycxdtyi3fel2hoxkt6gdicbxrafpbapt3ok2tjvg2cq
    ONTO m1k3nhcynkbkyk4c2cus6bmorns7c5fcdswu2oybi73ob5ss535u7q
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY queryActions {
          RENAME TO actionsQuery;
      };
  };
};
