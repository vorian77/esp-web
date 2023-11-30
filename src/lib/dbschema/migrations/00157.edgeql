CREATE MIGRATION m1zqn7irjsdhnvnpnjw7d2my5cn52pv6mumdxy7w35vqbpzrz3liuq
    ONTO m1r2di7kyrlpt63xubn4kcrub4naemv6hvdhatn4ngx6xt7yymjnea
{
  ALTER TYPE sys_core::Org {
      CREATE LINK userTypeDefault: sys_user::UserType;
  };
};
