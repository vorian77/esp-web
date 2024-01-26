CREATE MIGRATION m1bayon5g5j5wwyb7gp73r7xya7eby735bmbwbde7peqgna42wmcsq
    ONTO m1udjlfayyoitdbr57miotrspfoc4dcc6z2zjplpnkuuksjmhq5c2q
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER PROPERTY exprSelectDefault {
          RENAME TO exprPresetScalar;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK codeDataTypeDisplay {
          RENAME TO codeDisplayDataType;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE LINK codeDisplayType: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER LINK codeMask {
          RENAME TO codeDisplayMask;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE LINK columnDisplay: sys_db::SysColumn;
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      ALTER PROPERTY exprDisplay {
          RENAME TO exprPreset;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldLink {
      CREATE PROPERTY exprSave: std::str;
  };
};
