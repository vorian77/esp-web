CREATE MIGRATION m17xt3ev2y3pfnmgkfq7rpwray6edoynxneg4t4aa76fwtf53vmseq
    ONTO m1hzx3lumecmucxml7ofged47ub4xlwnwx5zlclomfehyy3inqqvoa
{
  DROP FUNCTION sys_core::getRoot(name: std::str);
  CREATE FUNCTION sys_core::getRoot() -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      ))
  );
};
