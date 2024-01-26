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
    multi actionsField: sys_core::SysDataObjAction;
    actionsQuery: array<json>;
    required codeCardinality: sys_core::SysCode;
    required codeComponent: sys_core::SysCode;
    multi columns: sys_core::SysDataObjColumn {
      on source delete delete target;
    };
    description: str;
    exprFilter: str;
    exprObject: str;
    isPopup: bool;
    subHeader: str;
    multi tables: sys_core::SysDataObjTable {
      on source delete delete target;
    };
    constraint exclusive on (.name);
  } 
  
  type SysDataObjColumn {
    required column: sys_db::SysColumn;
    
    nameCustom: str;

    # fields - db
    codeDbDataOp: sys_core::SysCode;
    codeDbDataSource: sys_core::SysCode;
    codeDbListDir: sys_core::SysCode;
    dbDataSourceKey: str;
    dbOrderList: default::nonNegative;
    exprPresetScalar: str;
    exprCustom: str;
    fieldName: str;
    indexTable: str;
    isDbAllowNull: bool;
    isDbFilter: bool;
    link: json;
  
    # fields - el
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
    itemsDb: sys_core::SysDataObjFieldItemsDb;
    itemsDbParms: json;
    width: int16;
  }

 type SysDataObjFieldItemsDb extending sys_core::SysObj {
    codeDataTypeDisplay: sys_core::SysCode;
    codeMask: sys_core::SysCode;
    required exprSelect: str;
    constraint exclusive on (.name);
 }

 type SysDataObjFieldLink {
    codeDisplayDataType: sys_core::SysCode;
    codeDisplayMask: sys_core::SysCode;
    multi columnsDisplay: sys_db::SysColumn; 
    exprPreset: str;
    exprSave: str;
    exprSelect: str;
    multi joins: sys_core::SysDataObjFieldLinkJoin;
 }

  type SysDataObjFieldLinkJoin {
    required column: sys_db::SysColumn;
    required table: sys_db::SysTable;
    required order: default::nonNegative;
  }

  type SysDataObjTable {
    columnParent: sys_db::SysColumn;   
    required index: str;
    indexParent: str;
    required order: default::nonNegative;
    required table: sys_db::SysTable;
  }

  type SysObjConfig extending sys_core::SysObj {
    creator: str;
    detailActions: str;
    detailDataObj: str;
    detailHeader: str;
    detailName: str;
    detailOrder: int16;
    detailParentNodeName: str;
    detailSubHeader: str;  
    hasMgmt: bool;
    icon: str;  
    linkProperty: str;
    linkTableModule: str;
    linkTableName: str;
    listActions: str;
    listDataObj: str;
    listExprFilter: str;
    listHeader: str;
    listName: str;
    listOrder: int16;
    listParentNodeName: str;
    listSubHeader: str;
    objsOwner: str; 
    outputDetailColumns: str;
    outputDetailNode: str;
    outputDetailDataObj: str;    
    outputListColumns: str;
    outputListNode: str;
    outputListDataObj: str;
    tableOwner: str;
    tableModule: str;
    tableName: str;    
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
    
  function getDataObjFieldItemsDb(name: str) -> optional sys_core::SysDataObjFieldItemsDb
    using (select sys_core::SysDataObjFieldItemsDb filter .name = name);  
    
  function getNodeObjByName(nodeObjName: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .id = <uuid>nodeObjId);     

  function isObjectLink(objName: str, linkName: str) -> optional bool
    using (select count(schema::ObjectType filter .name = objName and .links.name = linkName) > 0);     


  # <temp> migrate itemsList to functions rather than raw selects
  # have to beable to return an array from a function
  # function getItemsListCodeByCodeTypeName() -> array<Code>
  #     using (select Code );
}
