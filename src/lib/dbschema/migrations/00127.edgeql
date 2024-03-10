CREATE MIGRATION m1bpvagz4i35szblp5ayiimkexpukvarok432dolfjr3drlntgmyna
    ONTO m1k6z74mmxrv4yfbvlal6salm3xroexifetat6pjdhyn4fa6eq4opa
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK confirm {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
