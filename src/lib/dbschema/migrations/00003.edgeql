CREATE MIGRATION m1uhtumqmowr5ybd5bsjlz5botqvhxrxf4luqvo4qiazdhqphz6ttq
    ONTO m1lddbksjln62ats7hitooyj2gcxgib5famuoamlt2mbdbaot6t2yq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprSave: std::str;
      CREATE PROPERTY exprSelect: std::str;
  };
};
