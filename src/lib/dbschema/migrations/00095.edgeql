CREATE MIGRATION m15uxeybkberiokyzgsztcwvuh7ohbhpntv7pbuuybfuovor4iqzra
    ONTO m1e6lavvpndiimpa37dk5qytm4g34ji7ctbphxefom2jiq64luw3tq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK fieldChips {
          RENAME TO fieldListChips;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK fieldItems {
          RENAME TO fieldListItems;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY fieldItemsParms {
          RENAME TO fieldListItemsParms;
      };
  };
};
