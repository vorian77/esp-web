CREATE MIGRATION m1p566dcqmh4yykg7y5gedcbxug6ayddwd5xzbxo3rk44cqzrrspva
    ONTO m1owjhdu4etoygrfa6wikihdkbchv4icebh454nhw63uz2vsyqbstq
{
  ALTER TYPE sys_core::SysDataObjFieldListChips {
      ALTER LINK dataObj {
          ON SOURCE DELETE DELETE TARGET;
          RESET ON TARGET DELETE;
      };
  };
};
