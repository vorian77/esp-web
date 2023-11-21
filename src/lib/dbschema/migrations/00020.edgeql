CREATE MIGRATION m1c3vvwl2plnp4up5cczslwhusju2ep43md45hbhsayluj4gc44m6a
    ONTO m1sobf3wiagifzq7vyhl6phyy5dfus53xzb25expixftknfavzdmoq
{
  ALTER TYPE sys_obj::Form {
      ALTER LINK fields {
          RENAME TO fieldsDb;
      };
  };
};
