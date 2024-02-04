CREATE MIGRATION m1na6wuervt3gnti7ezgl57sy2me6bcyhfr5bglyvt7zwueosovfcq
    ONTO m1zukpptngc5o5t3mwkvnrongqj632nhnep6m47h4unnsfc3qxr65a
{
  ALTER TYPE sys_core::SysOverlayNodeFieldItems {
      CREATE REQUIRED PROPERTY isMultiSelect: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
