CREATE MIGRATION m1udjlfayyoitdbr57miotrspfoc4dcc6z2zjplpnkuuksjmhq5c2q
    ONTO m1bth5cv3r7dihxb5vzugiryrew3zh7yo3caz26isqtnzyqt2fsrfq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER LINK subTables {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
