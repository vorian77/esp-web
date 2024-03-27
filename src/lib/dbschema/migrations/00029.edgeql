CREATE MIGRATION m1dwjze2ggzrb3u3t462muwfxlo3sdwolm7k3jfoxspds3rdxyhqka
    ONTO m1mlnzvawsdm45ijmlggyzhng4rm3p6totrhbpxbucye2wnevnlgua
{
  CREATE FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str) -> OPTIONAL std::int64 USING (SELECT
      std::count(schema::ObjectType FILTER
          ((.name = objName) AND (.links.name = linkName))
      )
  );
};
