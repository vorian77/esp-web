CREATE MIGRATION m1676leinewh7ppaxxrnc3t2nnp4dudevtcunrv723elgfqvk3x42q
    ONTO m1dq3vhukudvhqn52l5232vnimppcw7xfxte3iogywofukpocpbxjq
{
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      DROP LINK fieldsDb;
      DROP LINK table;
      DROP PROPERTY exprDisplay;
  };
};
