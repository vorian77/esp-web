CREATE MIGRATION m1wx65pfytiqjpkf4kelef7dxzqqxvvzfwqefrmdioglhgigwjax3a
    ONTO m1j43pjufrtyvpgsaegfahmrmwjg4cvwockwoi5jpjctya7rszfqtq
{
  ALTER TYPE sys_user::Staff {
      ALTER LINK owner {
          SET TYPE sys_core::Org USING (.owner[IS sys_core::Org]);
      };
  };
  ALTER TYPE sys_user::User {
      ALTER LINK owner {
          SET TYPE sys_core::Org USING (.owner[IS sys_core::Org]);
      };
  };
};
