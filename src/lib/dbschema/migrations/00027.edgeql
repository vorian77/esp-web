CREATE MIGRATION m1zaxgkpacxr2hndx72fwl4izeekxbsvzohjwieejpadbxvuy2bdnq
    ONTO m14cpq63q5dt2ehqw5q73gl7wnmqo5yact44ts5ighzehx5fpboj2a
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP LINK table;
  };
};
