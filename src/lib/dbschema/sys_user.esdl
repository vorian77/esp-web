module sys_user {
  abstract type Mgmt {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };

    required createdBy: User {
      readonly := true;
    };
    
    modifiedAt: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }

    required modifiedBy: User 
  }
  
  type Staff extending sys_user::Mgmt {
    required owner: sys_core::ObjRoot;
    required person: default::Person{
       on source delete delete target if orphan;
    };
    multi roles: sys_core::Code;
  }

  type User {
    required owner: sys_core::ObjRoot;
    required person: default::Person{
      on source delete delete target if orphan;
    };
    required userName: str;
    required password: str;
    multi userTypes: UserType {
      on target delete allow;
    };
    constraint exclusive on (.userName);
  }
  
  type UserType extending sys_core::Obj {
    multi resources: sys_core::Obj {
      on target delete allow;
    };
    constraint exclusive on ((.name));
  }
  type Widget extending sys_core::Obj {
    constraint exclusive on (.name);
  }

  # GLOBALS
  global SYS_USER := (
    select User filter .userName = 'sys_user'
  );
  
  global SYS_USER_ID := (
    select User { id } filter .userName = 'sys_user'
  );

  global currentUserId: uuid;

  global currentUser := (
    select User filter .id = global currentUserId
  );

  # FUNCTIONS
  function getUser(userName: str) -> optional User
      using (select User filter .userName = userName);

  function getUserType(userTypeName: str) -> optional UserType
    using (select UserType filter .name = userTypeName);

  function getWidget(widgetName: str) -> optional Widget
    using (select Widget filter .name = widgetName);   
}
