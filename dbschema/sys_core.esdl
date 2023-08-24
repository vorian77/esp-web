module sys_core {
  type ObjRoot {
  required name: default::Name;
  label: str;
  }

  abstract type Obj extending sys_core::ObjRoot, default::Mgmt {
    required owner: sys_core::ObjRoot;   
  } 

  type Ent extending sys_core::Obj {
    constraint exclusive on (.name);
  }

  type CodeType extending sys_core::Obj {
    constraint exclusive on ((.name));
  }

  type Code extending sys_core::Obj {
    required code_type: sys_core::CodeType;
    constraint exclusive on ((.code_type, .name));
  }

  type HomeScreenWidget extending sys_core::Obj {
    constraint exclusive on (.name);
  }

  type HomeScreen extending sys_core::Obj {
    multi widgets: HomeScreenWidget {
      on target delete allow;
    };
    constraint exclusive on (.name);
  }

  # FUNCTIONS
  function getRoot() -> optional sys_core::ObjRoot
    using (select assert_single((select sys_core::ObjRoot filter .name = 'root')));

  function getEnt(entName: str) -> optional sys_core::Ent
      using (select sys_core::Ent filter .name = entName);

  function getCodeType(codeTypeName: str) -> optional sys_core::CodeType
    using (select sys_core::CodeType filter .name = codeTypeName);

  function getCode(
    codeTypeName: str,  
    codeName: str) -> optional sys_core::Code
      using (select sys_core::Code filter 
        .code_type = (select getCodeType(codeTypeName)) and 
        .name = codeName);

  function getHomeScreenWidget(widgetName: str) -> optional sys_core::HomeScreenWidget
    using (select sys_core::HomeScreenWidget filter .name = widgetName);    
}