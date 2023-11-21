CREATE MIGRATION m14bmqojmkct7bzmr33tkr5fsozpjlfbp664yv3vv46qzpxveoduvq
    ONTO m1xgqehvn2da6lhyfp6shn3yzpa7jalyrsslfj6nn6ikpfztzuuo4a
{
  ALTER TYPE sys_obj::FormField {
      CREATE PROPERTY exprSelectPreset: std::str;
  };
};
