CREATE MIGRATION m1wulpjhrmyr4b7wfdf3mpqd6wvfjt2dheq24cnjat74ssis3bpnxa
    ONTO m17pg2jtpjxvv7jv4r4dzvtj4ebkijlwti6i6hqx7r5l7nv35dv25a
{
  ALTER TYPE app_cm_training::Section {
      CREATE REQUIRED LINK course: app_cm_training::Course {
          SET REQUIRED USING (<app_cm_training::Course>{});
      };
  };
};
