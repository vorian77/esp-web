CREATE MIGRATION m1dxn54aoru7tnmhaivuyclzqm3ljdjtmtpjqckwcaazkfz2v5qhoq
    ONTO m1k5dnjvrr7yndmk6b2ze35pvc2pxbgnc3vfytjyhomhmfsofnom3a
{
  ALTER TYPE sys_core::SysDataObjFieldLinkTabCol {
      ALTER LINK table {
          RESET OPTIONALITY;
      };
  };
};
