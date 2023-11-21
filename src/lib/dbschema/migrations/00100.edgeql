CREATE MIGRATION m1jho2ldpcl3vdsg6veajzpf3ksbesixnyeloniec4kicjsgzh5hyq
    ONTO m17xt3ev2y3pfnmgkfq7rpwray6edoynxneg4t4aa76fwtf53vmseq
{
  ALTER FUNCTION sys_core::getRoot() USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = '*ROOTOBJ*')
      ))
  );
};
