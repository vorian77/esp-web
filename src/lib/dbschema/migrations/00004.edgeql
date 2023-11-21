CREATE MIGRATION m1hka6t5r4xcbqlvoxlosqmwj2uszdpxcv5pljfzje4dkswpltj7ta
    ONTO m1uhtumqmowr5ybd5bsjlz5botqvhxrxf4luqvo4qiazdhqphz6ttq
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprSave;
  };
};
