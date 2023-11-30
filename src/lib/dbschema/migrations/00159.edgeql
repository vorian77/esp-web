CREATE MIGRATION m1jhpiufhhteeoj6q3jghxnn6ferdnkhhqxhmk4kruq3e5mej7qbva
    ONTO m1lhopachx3o2y7vgz7vj5k2ubeulffgqxpwnvvcpzyv2h7joi2xpa
{
  ALTER FUNCTION sys_core::getOrg(name: std::str) USING (SELECT
      std::assert_single((SELECT
          sys_core::Org
      FILTER
          (.name = name)
      ))
  );
};
