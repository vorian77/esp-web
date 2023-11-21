module sys_core {
  type ObjRoot {
    required name: str;
    header: str;
  }

  abstract type Obj extending ObjRoot, sys_user::Mgmt {
    required owner: ObjRoot;   
  } 

  type Ent extending Obj {
    multi roles: sys_core::Code; 
    constraint exclusive on (.name);
  }

  type App extending Ent {}

  type Org extending Ent {
    addr1: str;
    addr2: str;
    city: str;
    state: CodeType;
    zip: str;
  }

  type CodeType extending Obj {
    parent: CodeType;
    required order: default::nonNegative;
    constraint exclusive on ((.name));
  }

  type Code extending Obj {
    parent: Code;
    required codeType: CodeType;
    required order: default::nonNegative;
    value: str;
    constraint exclusive on ((.codeType, .name));
  }

  # FUNCTIONS
  function getRoot() -> optional ObjRoot
    using (select assert_single((select ObjRoot filter .name = '*ROOTOBJ*')));

  function getEnt(entName: str) -> optional Ent
      using (select Ent filter .name = entName);

  function getCodeType(codeTypeName: str) -> optional CodeType
    using (select CodeType filter .name = codeTypeName);

  function getCode(codeTypeName: str,  codeName: str) -> optional Code
      using (select assert_single(Code filter 
        .codeType.name = codeTypeName and 
        .name = codeName));

  function getOrg(name: str) -> optional Org
      using (select Org filter .name = name);


  # <temp> migrate itemsList to functions rather than raw selects
  # have to beable to return an array from a function
  # function getItemsListCodeByCodeTypeName() -> array<Code>
  #     using (select Code );
}