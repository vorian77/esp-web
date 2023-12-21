CREATE MIGRATION m14lbghizhp7k7vdng5r47yagmbipph5mo6dza2bu2cykwcvasprfa
    ONTO m1cznynbcticgh2vgaefjktxewsfyaapzcj6qeqycyyyj2vhtkafmq
{
  ALTER TYPE sys_obj::NodeObj {
      ALTER PROPERTY page {
          RESET OPTIONALITY;
      };
  };
};
