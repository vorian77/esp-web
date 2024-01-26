CREATE MIGRATION m1dq3vhukudvhqn52l5232vnimppcw7xfxte3iogywofukpocpbxjq
    ONTO m1gk6rlxrw4kyms2fvlseemqdrxxf5vgdhauxkpzv5vbo4wso7p3wq
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER PROPERTY exprFilter {
          RENAME TO exprSelectDefault;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      DROP PROPERTY exprPreset;
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      CREATE LINK codeDataTypeDisplay: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      CREATE LINK codeMask: sys_core::SysCode;
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      CREATE LINK table: sys_db::SysTable;
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      ALTER PROPERTY dbSelect {
          RENAME TO exprDisplay;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      ALTER PROPERTY propertyId {
          RENAME TO exprSelect;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldItemsDb {
      DROP PROPERTY propertyLabel;
  };
  ALTER TYPE sys_db::SysColumn {
      DROP LINK codeDataTypeComputed;
      DROP LINK codeLinkRenderType;
      DROP PROPERTY JsonIdProperty;
      DROP PROPERTY exprPreset;
      DROP PROPERTY exprSave;
      DROP PROPERTY exprSelect;
  };
};
