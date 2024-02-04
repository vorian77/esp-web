CREATE MIGRATION m1tg4meoboqbrmht6bh7pya6cesfhyz3syecfbwsixqovmrtoerkiq
    ONTO m1na6wuervt3gnti7ezgl57sy2me6bcyhfr5bglyvt7zwueosovfcq
{
  ALTER TYPE sys_core::SysDataObjFieldItemsDb RENAME TO sys_core::SysDataObjFieldItems;
  ALTER FUNCTION sys_core::getDataObjFieldItemsDb(name: std::str) {
      RENAME TO sys_core::getDataObjFieldItems;
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK overlayNodeItems {
          RENAME TO overlayNodeFieldItems;
      };
  };
};
