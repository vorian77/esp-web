CREATE MIGRATION m13iyfipfs5onxs75wm7r4z6u4mhxa72mrthzkj42htb33qjyqed3q
    ONTO m1cwdfodwpkgpqndh7vx3jjwsqlng375sz5mlkkkqismuztgjitrxa
{
  ALTER TYPE app_cm_training::Section {
      ALTER LINK codeStatus {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY capacity {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY isCohortRequired {
          RESET OPTIONALITY;
      };
  };
};
