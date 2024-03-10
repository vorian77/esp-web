CREATE MIGRATION m1c7wzujuumr6zqgw4dsasg77uofsn36xhx3rdpjn6caibd3nejcja
    ONTO m1dbelkitruwpp44vzbv5ntgbzrlxntfupysptcbyiefqmgbc2dbbq
{
  ALTER TYPE sys_core::SysDataObjAction {
      DROP PROPERTY confirmButtonLabel;
      DROP PROPERTY confirmMessage;
      DROP PROPERTY confirmTitle;
  };
};
