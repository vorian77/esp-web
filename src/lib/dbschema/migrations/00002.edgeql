CREATE MIGRATION m1vot3gwta7jzxhgiq4mwhd2wpwrn2ez2ucwzs3iopv3i3mii2bkfa
    ONTO m17pkq6pyiylxs5fadflzdhxrnketxhjnumwxrluhg43epjxhqpurq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK table;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY table: std::str;
  };
};
