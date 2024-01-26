CREATE MIGRATION m13c6mbneukuhcv74gwnca2jf3guywcvyu2q4ccr6xsoj7eoqatwwa
    ONTO m1knixh6x5micvs3gq6wuam4etzyzjb4dtvi6ll5c2besuhvaxmeua
{
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK columnSubTable {
          RENAME TO columnLink;
      };
  };
};
