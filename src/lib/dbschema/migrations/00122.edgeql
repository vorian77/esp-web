CREATE MIGRATION m17lnr7zsrjb5axhpggomumqzp2jlqyviuxxqntprltvcnyutvqvwa
    ONTO m12p7og66x7e6bo57itjapclyuonvbmj3bkephqvzxmuvoqro4mjla
{
  ALTER TYPE sys_core::SysDataObjAction {
      DROP PROPERTY allTabs;
  };
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER PROPERTY confirmMsg {
          RENAME TO confirmMessage;
      };
  };
};
