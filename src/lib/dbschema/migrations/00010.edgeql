CREATE MIGRATION m1jdkyaec4nmtr77h5ektjyruc56b5qzf37fbvgje5zzvfepfo44qq
    ONTO m14d52vzpv3mchgcqkpukzutfn3cyrurbu5aus4hzixzp4r2kb47ua
{
  ALTER TYPE sys_obj::FormField {
      CREATE PROPERTY isDbSysSet: std::bool;
  };
};
