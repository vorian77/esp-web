module sys_user {
  global SYS_USER := (
    select User filter .username = 'sys_user'
  );
  
  global SYS_USER_ID := (
    select User { id } filter .username = 'sys_user'
  );

  type User extending default::Person {
    required username: str {
      constraint exclusive;
    };
    required password: str;
  }

# functions
function getUser(userName: str) -> optional User
    using (select sys_user::User filter .username = userName);
}
