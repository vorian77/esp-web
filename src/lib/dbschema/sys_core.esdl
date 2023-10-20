module sys_core {
  type ObjRoot {
    required name: str;
    header: str;
  }

  abstract type Obj extending sys_core::ObjRoot, default::Mgmt {
    required owner: sys_core::ObjRoot;   
  } 

  type Ent extending sys_core::Obj {
    constraint exclusive on (.name);
  }

  type App extending sys_core::Ent {}

  type CodeType extending sys_core::Obj {
    constraint exclusive on ((.name));
  }

  type Code extending sys_core::Obj {
    required codeType: sys_core::CodeType;
    constraint exclusive on ((.codeType, .name));
  }

  # FUNCTIONS
  function getRoot() -> optional sys_core::ObjRoot
    using (select assert_single((select sys_core::ObjRoot filter .name = '*ROOTOBJ*')));

  function getEnt(entName: str) -> optional sys_core::Ent
      using (select sys_core::Ent filter .name = entName);

  function getCodeType(codeTypeName: str) -> optional sys_core::CodeType
    using (select sys_core::CodeType filter .name = codeTypeName);

  function getCode(
    codeTypeName: str,  
    codeName: str) -> optional sys_core::Code
      using (select sys_core::Code filter 
        .codeType = (select getCodeType(codeTypeName)) and 
        .name = codeName);
}