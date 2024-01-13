module sys_core {
  type ObjRoot {
    required name: str;
    header: str;
  }

  abstract type SysObj extending sys_core::ObjRoot, sys_user::Mgmt {
    required owner: sys_core::ObjRoot;   
  } 

  type SysEnt extending sys_core::SysObj {
    multi roles: sys_core::SysCode{
      on target delete allow;
    }; 
    constraint exclusive on (.name);
  }

  type SysApp extending sys_core::SysEnt {}

  type SysOrg extending sys_core::SysEnt {
    addr1: str;
    addr2: str;
    city: str;
    state: sys_core::SysCodeType;
    zip: str;
  }

  type SysCodeType extending sys_core::SysObj {
    parent: sys_core::SysCodeType;
    required order: default::nonNegative;
    constraint exclusive on ((.name));
  }

  type SysCode extending sys_core::SysObj {
    parent: sys_core::SysCode;
    required codeType: sys_core::SysCodeType;
    required order: default::nonNegative;
    valueDecimal: decimal;
    valueInteger: int64;
    valueString: str;
    constraint exclusive on ((.codeType, .name));
  }

  type SysNodeObj extending sys_core::SysObj {
    required codeIcon: sys_core::SysCode;
    required codeType: sys_core::SysCode;
    dataObj: sys_core::SysDataObj {
      on target delete allow
    };
    parent: sys_core::SysNodeObj;
    required order: default::nonNegative;
    page: str;
    queryActions: array<json>;
    constraint exclusive on (.name);
  }

  type SysNodeObjFooter extending sys_core::SysNodeObj {}

  type SysDataObjAction extending sys_core::SysObj {
    allTabs: bool;
    color: str;
    required order: default::nonNegative;
    constraint exclusive on (.name);
  }

  type SysDataObj extending sys_core::SysObj {
    multi actions: sys_core::SysDataObjAction;
    required codeCardinality: sys_core::SysCode;
    required codeComponent: sys_core::SysCode;
    description: str;
    exprFilter: str;
    exprObject: str;
    multi fieldsDb: sys_core::SysDataObjFieldDb {
      on source delete delete target;
    };
    multi fieldsEl: sys_core::SysDataObjFieldEl {
      on source delete delete target;
    };
    isPopup: bool;
    link: json;
    subHeader: str;
    table: sys_db::SysTable;
    constraint exclusive on (.name);
  } 
  
  type SysDataObjFieldDb {
    codeDbDataOp: sys_core::SysCode;
    codeDbDataSource: sys_core::SysCode;
    codeDbListDir: sys_core::SysCode;
    required column: sys_db::SysColumn {
      on source delete allow;
    };
    dbDataSourceKey: str;
    dbOrderList: default::nonNegative;
    exprFilter: str;
    exprPreset: str;
    fieldName: str;
    isDbAllowNull: bool;
    isDbFilter: bool;
    isLinkMember: bool;
  }

  type SysDataObjFieldEl {
    required column: sys_db::SysColumn {
      on source delete allow;
    };   
    codeAccess: sys_core::SysCode;
    codeElement: sys_core::SysCode;
    customElement: json;
    dbOrderCrumb: default::nonNegative;
    dbOrderSelect: default::nonNegative;
    headerAlt: str;
    height: int16;
    isDisplay: bool;
    isDisplayable: bool;
    items: array<json>;
    itemsList: sys_core::SysDataObjFieldItems{
     on source delete allow;
    };
    itemsListParms: json;
    width: int16;
  }

 type SysDataObjFieldItems extending sys_core::SysObj {
    required dbSelect: str;
    required propertyId: str;
    required propertyLabel: str;
    multi fieldsDb: sys_core::SysDataObjFieldDb {
      on source delete delete target;
    };
    constraint exclusive on (.name);
 }

  # FUNCTIONS
  function getRootObj() -> optional sys_core::ObjRoot
    using (select assert_single((select sys_core::ObjRoot filter .name = '*ROOTOBJ*')));

  function getEnt(entName: str) -> optional sys_core::SysEnt
      using (select sys_core::SysEnt filter .name = entName);

  function getCodeType(codeTypeName: str) -> optional sys_core::SysCodeType
    using (select sys_core::SysCodeType filter .name = codeTypeName);

  function getCode(codeTypeName: str,  codeName: str) -> optional sys_core::SysCode
      using (select assert_single(sys_core::SysCode filter 
        .codeType.name = codeTypeName and 
        .name = codeName));

  function getOrg(name: str) -> optional sys_core::SysOrg
      using (select assert_single((select sys_core::SysOrg filter .name = name)));

  function getDataObj(dataObjName: str) -> optional sys_core::SysDataObj
    using (select sys_core::SysDataObj filter .name = dataObjName);        
    
  function getDataObjAction(dataObjActionName: str) -> optional sys_core::SysDataObjAction
    using (select sys_core::SysDataObjAction filter .name = dataObjActionName);        
    
  function getDataObjFieldItems(name: str) -> optional sys_core::SysDataObjFieldItems
    using (select sys_core::SysDataObjFieldItems filter .name = name);  
    
  function getNodeObjByName(nodeObjName: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .id = <uuid>nodeObjId);     

  # <temp> migrate itemsList to functions rather than raw selects
  # have to beable to return an array from a function
  # function getItemsListCodeByCodeTypeName() -> array<Code>
  #     using (select Code );
}