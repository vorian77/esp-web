CREATE MIGRATION m1xgqehvn2da6lhyfp6shn3yzpa7jalyrsslfj6nn6ikpfztzuuo4a
    ONTO m1xpbwsqmpwg67dprxct6qoeewmsubry2armwbmgmtf3wdecilexuq
{
  ALTER TYPE sys_obj::FormField {
      CREATE LINK codeDbDataSourcePreset: sys_core::Code;
  };
  ALTER TYPE sys_obj::FormField {
      CREATE PROPERTY dbDataSourceKeyPreset: std::str;
      DROP PROPERTY presetConfig;
  };
};
