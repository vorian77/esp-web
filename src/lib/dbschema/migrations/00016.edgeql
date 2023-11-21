CREATE MIGRATION m1xuubqbzhmoemm2hxipjjcuuzrpydjqaldzqdes65se2nouhg3nka
    ONTO m1x2gpac2fckzlefz73le3svksneahpss63yyqxw7kbbk5y7dbp22q
{
  ALTER TYPE app_cm::Student {
      CREATE PROPERTY note: std::str;
  };
};
