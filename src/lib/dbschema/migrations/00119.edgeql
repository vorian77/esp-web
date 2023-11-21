CREATE MIGRATION m122dti24ervtl376slsgcfy3teedujfsyc7au5pchyq7fpeb74yvq
    ONTO m1dt2pf6orpukgc5pgpxckacevyz33u54nv32rpiviihyeyax65jyq
{
  ALTER TYPE sys_db::Column {
      ALTER PROPERTY exprSave {
          RENAME TO exprPreset;
      };
  };
};
