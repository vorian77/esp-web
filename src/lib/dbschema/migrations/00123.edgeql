CREATE MIGRATION m1dbelkitruwpp44vzbv5ntgbzrlxntfupysptcbyiefqmgbc2dbbq
    ONTO m17lnr7zsrjb5axhpggomumqzp2jlqyviuxxqntprltvcnyutvqvwa
{
  CREATE TYPE sys_core::SysDataObjActionConfirm {
      CREATE REQUIRED PROPERTY confirmButtonLabel: std::str;
      CREATE REQUIRED PROPERTY confirmMessage: std::str;
      CREATE REQUIRED PROPERTY confirmTitle: std::str;
  };
};
