CREATE MIGRATION m1qsbydi3md2smxpmw55g7crddxo53mudymhuwuwmyakikhxhpr32q
    ONTO m1niox3x74eajfakusew6hxaea3fyigdcm7lx3o4qhyphml4r5nv5a
{
  ALTER FUNCTION sys_core::getRoot() USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = '*ROOTOBJ*')
      ))
  );
};
