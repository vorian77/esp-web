CREATE MIGRATION m17bzhqvx454bvg3xezxpdrlaotmtbcm4abhtcvswf2wywlv6kuzja
    ONTO m1yxu35vaxld2w6t4k7p4tou7uemqjthzwukc6rewsuryyxsbvos4q
{
  CREATE FUNCTION sys_user::getStaffByName(firstName: std::str, lastName: std::str) -> OPTIONAL sys_user::Staff USING (SELECT
      std::assert_single(sys_user::Staff FILTER
          (std::str_lower(.person.firstName) = std::str_lower(firstName))
      )
  );
};
