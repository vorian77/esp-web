CREATE MIGRATION m1yxzbzi7h5ok27eticeurgs3k42operblmuleipldybdvhlskbmda
    ONTO m17bzhqvx454bvg3xezxpdrlaotmtbcm4abhtcvswf2wywlv6kuzja
{
  ALTER FUNCTION sys_user::getStaffByName(firstName: std::str, lastName: std::str) USING (SELECT
      std::assert_single(sys_user::Staff FILTER
          ((std::str_lower(.person.firstName) = std::str_lower(firstName)) AND (std::str_lower(.person.lastName) = std::str_lower(lastName)))
      )
  );
};
