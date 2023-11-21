CREATE MIGRATION m1fgjv3y26prwhukzasmyyi2j5czumns2f2vyojdm5bgkbabaoss4a
    ONTO m1glabgtiwg2hqbewsseej7uyxj2okyrtzclngwgwbfavff74sdyoa
{
  DROP FUNCTION sys_core::getRoot();
  CREATE FUNCTION sys_core::getRoot(name: std::str) -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = name)
      ))
  );
};
