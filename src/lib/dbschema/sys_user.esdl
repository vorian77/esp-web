module sys_user {
  type User extending default::Person {
    required username: str;
    required password: str;
    multi resources: sys_core::Obj {
      allow: bool {
        default := true;
      };
      on target delete allow;
    };
    multi link userTypes := .<users[is UserType];
    constraint exclusive on (.username);
  }
  
  type UserType extending sys_core::Obj {
    multi resources: sys_core::Obj {
      allow: bool {
        default := true;
      };
      on target delete allow;
    };
     multi users: User {
      on target delete allow;
    };
    constraint exclusive on ((.name));
  }
  
  # GLOBALS
  global SYS_USER := (
    select User filter .username = 'sys_user'
  );
  
  global SYS_USER_ID := (
    select User { id } filter .username = 'sys_user'
  );

  global currentUserId: uuid;

  global currentUser := (
    select User filter .id = global currentUserId
  );

  # FUNCTIONS
  function getUser(userName: str) -> optional User
      using (select sys_user::User filter .username = userName);

  function getUserType(userTypeName: str) -> optional UserType
    using (select sys_user::UserType filter .name = userTypeName);
}
