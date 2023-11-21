CREATE MIGRATION m13vwrw6tkgpwlztzxugkvo53fqtvtynrv242xnn4juwa27kc2re5q
    ONTO m1hka6t5r4xcbqlvoxlosqmwj2uszdpxcv5pljfzje4dkswpltj7ta
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY exprSelectUpdate: std::str;
  };
};
