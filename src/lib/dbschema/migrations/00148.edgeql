CREATE MIGRATION m17pg2jtpjxvv7jv4r4dzvtj4ebkijlwti6i6hqx7r5l7nv35dv25a
    ONTO m1sium64p6i2u3d7sohf3fi35fjllkvk2tlxsi5pmi5dbb2c6erk4a
{
  ALTER TYPE app_cm_training::Section {
      DROP LINK course;
      DROP PROPERTY sectionID;
  };
};
