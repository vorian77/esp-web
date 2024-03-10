CREATE MIGRATION m1qbcylxrxqguk7tg4mohoyq77fkvmayxqu2bqblwa2rdbr4d2mdoa
    ONTO m1c7wzujuumr6zqgw4dsasg77uofsn36xhx3rdpjn6caibd3nejcja
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER PROPERTY confirm {
          RESET OPTIONALITY;
      };
  };
};
