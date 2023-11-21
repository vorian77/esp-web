CREATE MIGRATION m1xpbwsqmpwg67dprxct6qoeewmsubry2armwbmgmtf3wdecilexuq
    ONTO m1jdkyaec4nmtr77h5ektjyruc56b5qzf37fbvgje5zzvfepfo44qq
{
  ALTER TYPE sys_obj::FormField {
      DROP PROPERTY isDbPreset;
  };
  ALTER TYPE sys_obj::FormField {
      CREATE PROPERTY presetConfig: std::str;
  };
};
