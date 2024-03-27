CREATE MIGRATION m1wawp3w2qdw26skwivpeigfutevpxn6jewhyhapcqjyrtigkqmt6a
    ONTO m1dwjze2ggzrb3u3t462muwfxlo3sdwolm7k3jfoxspds3rdxyhqka
{
  DROP FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str);
  CREATE FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str) -> OPTIONAL std::bool USING (SELECT
      (std::count(schema::ObjectType FILTER
          ((.name = objName) AND (.links.name = linkName))
      ) > 0)
  );
};
