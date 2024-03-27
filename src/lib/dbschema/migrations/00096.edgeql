CREATE MIGRATION m1owjhdu4etoygrfa6wikihdkbchv4icebh454nhw63uz2vsyqbstq
    ONTO m15uxeybkberiokyzgsztcwvuh7ohbhpntv7pbuuybfuovor4iqzra
{
  ALTER TYPE sys_core::SysDataObjFieldListChips {
      CREATE REQUIRED LINK dataObj: sys_core::SysDataObj {
          ON TARGET DELETE ALLOW;
          SET REQUIRED USING (<sys_core::SysDataObj>{});
      };
  };
};
