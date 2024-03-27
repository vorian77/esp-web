CREATE MIGRATION m15iwzqyojps6ndwezzdtwjwcshkuntrn36wb5fuhkxqjrtfto2xga
    ONTO m1sg4dztczmvoox4sy5fmwuch5ifz5wdlvjpdibearxqfwob3lo7ha
{
  ALTER TYPE sys_core::SysDataObjFieldDb {
      CREATE PROPERTY indexTable: std::str;
  };
};
