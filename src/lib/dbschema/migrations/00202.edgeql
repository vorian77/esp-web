CREATE MIGRATION m1n3wzbr232mwq5dj72qa6urdwu4ypar4y2pdgloq3qo4nynup3cna
    ONTO m14ikqamqqbzfggutnt65vba4jhtopzhizaovg772kvulzsbur5r2a
{
  ALTER FUNCTION sys_core::getRoot() {
      RENAME TO sys_core::getRootObj;
  };
  CREATE FUNCTION sys_user::getRootUser() -> OPTIONAL sys_user::UserRoot USING (SELECT
      std::assert_single((SELECT
          sys_user::UserRoot
      FILTER
          (.userName = 'user_sys')
      ))
  );
};
