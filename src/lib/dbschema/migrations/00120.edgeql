CREATE MIGRATION m1fge3k4fbqvngwdarpofjtg3ac4sogy3fdmtkeqctgzhchrvuh4sa
    ONTO m122dti24ervtl376slsgcfy3teedujfsyc7au5pchyq7fpeb74yvq
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprPreset;
  };
};
