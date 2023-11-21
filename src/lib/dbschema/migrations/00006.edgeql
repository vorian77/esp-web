CREATE MIGRATION m1w5v2culipqdfvusjg33ehqe2czbwsypojm532x7a5nr7ttykwnrq
    ONTO m13vwrw6tkgpwlztzxugkvo53fqtvtynrv242xnn4juwa27kc2re5q
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprSelectUpdate;
  };
};
