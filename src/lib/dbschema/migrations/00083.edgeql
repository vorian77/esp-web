CREATE MIGRATION m1glabgtiwg2hqbewsseej7uyxj2okyrtzclngwgwbfavff74sdyoa
    ONTO m12sirlrxjz5sk25ngietkixtjrbbi4seqrlgchfmhavhsopz77ivq
{
  ALTER TYPE sys_user::User DROP EXTENDING default::Mgmt;
  ALTER TYPE sys_user::User {
      CREATE LINK owner: sys_core::ObjRoot;
  };
};
