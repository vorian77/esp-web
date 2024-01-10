module sys_user {
  abstract type Mgmt {
    required createdAt: datetime {
      default := datetime_of_transaction();
      readonly := true;
    };

    required createdBy: UserRoot {
      readonly := true;
    };
    
    modifiedAt: datetime {
      rewrite insert, update using (datetime_of_transaction())
    }

    required modifiedBy: UserRoot
  }
  
  type Staff extending sys_user::Mgmt {
    required owner: sys_core::Org;
    required person: default::Person{
       on source delete delete target if orphan;
    };
    multi roles: sys_core::Code{
        on target delete allow;
      }; 
  }
 
  type UserRoot {
    required person: default::Person{
      on source delete delete target if orphan;
    };
    required userName: str;
    constraint exclusive on (.userName);
  }

  type User extending sys_user::UserRoot, sys_user::Mgmt {
    required owner: sys_core::Org;
    multi orgs: sys_core::Org {
      on target delete allow;
    };
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
   function getRootUser() -> optional UserRoot
    using (select assert_single((select UserRoot filter .userName = '*ROOTUSER*')));

  function getStaffByName(firstName: str, lastName: str) -> optional Staff
      using (select assert_single(Staff filter 
        str_lower(.person.firstName) = str_lower(firstName) and
        str_lower(.person.lastName) = str_lower(lastName)
        )
      );

  function getUser(userName: str) -> optional User
      using (select User filter .userName = userName);

  function getUserType(userTypeName: str) -> optional UserType
    using (select UserType filter .name = userTypeName);

  function getWidget(widgetName: str) -> optional Widget
    using (select Widget filter .name = widgetName);

}
