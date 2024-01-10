CREATE MIGRATION m1j43pjufrtyvpgsaegfahmrmwjg4cvwockwoi5jpjctya7rszfqtq
    ONTO m1qpl2my6a6662ex45tbtpxijet4c55ltfunozmp33z65ahendkkqq
{
  ALTER TYPE sys_user::User {
      CREATE MULTI LINK orgs: sys_core::Org {
          ON TARGET DELETE ALLOW;
      };
  };
};
