CREATE MIGRATION m1gi6uidlwjze643f7vliu2mqaojwwbxuoyl3c27pzcs73zagi2qva
    ONTO m1ntcfellh3l6oixabetw3eaed3yr6vpgpdd73rruptm7lnvqrn35a
{
  ALTER TYPE app_cm_training::Course {
      ALTER PROPERTY active {
          RENAME TO isActive;
      };
  };
};
