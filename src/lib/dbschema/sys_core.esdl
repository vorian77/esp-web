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
    codeState: sys_core::SysCode;
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
    valueDecimal: float64;
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

  type SysDataObj extending sys_core::SysObj {
    actionsFieldGroup: sys_core::SysDataObjActionGroup {
      on target delete allow;
    }
    actionsQuery: array<json>;
    required codeCardinality: sys_core::SysCode;
    required codeComponent: sys_core::SysCode;
    multi columns: sys_core::SysDataObjColumn {
      on source delete delete target;
    };
    description: str;
    exprFilter: str;
    exprObject: str;
    subHeader: str;
    parentColumn: sys_db::SysColumn;
    parentTable: sys_db::SysTable;
    multi tables: sys_core::SysDataObjTable {
      on source delete delete target;
      on target delete allow;
    };
    constraint exclusive on (.name);
  } 

  type SysDataObjAction extending sys_core::SysObj {
    required checkObjChanged: bool;
    required codeRenderShowSaveMode: sys_core::SysCode;
    required codeActionType: sys_core::SysCode;
    confirm: SysDataObjActionConfirm {
      on source delete delete target;
    };
    color: str;
    required order: default::nonNegative;
    required isRenderDisableOnInvalidToSave: bool;
    isRenderShowRequiresObjHasChanged: bool;
    constraint exclusive on (.name);
  }

  type SysDataObjActionConfirm{
    required confirmButtonLabel: str;
    required confirmMessage: str;
    required confirmTitle: str;
  }

  type SysDataObjActionGroup extending sys_core::SysObj {
   multi actions: sys_core::SysDataObjAction;
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
    fieldListConfig: sys_core::SysDataObjFieldListConfig {
      on source delete delete target;
    };
    fieldListItems: sys_core::SysDataObjFieldListItems;
    fieldListItemsParms: json;
    fieldListSelect: sys_core::SysDataObjFieldListSelect {
      on source delete delete target;
    };
    headerAlt: str;
    height: int16;
    isDisplay: bool;
    isDisplayable: bool;
    isDisplayBlock: bool;
    items: array<json>;
    width: int16;
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
 
  type SysDataObjFieldListConfig extending sys_core::SysObj {
     actionsFieldGroup: sys_core::SysDataObjActionGroup {
      on target delete allow;
    }
    required dataObjConfig: sys_core::SysDataObj {
      on source delete delete target if orphan;
    };
    required dataObjDisplay: sys_core::SysDataObj {
      on source delete delete target if orphan;
    };
    required isMultiSelect: bool;
    constraint exclusive on (.name);
  }

  type SysDataObjFieldListItems extending sys_core::SysObj {
    codeDataTypeDisplay: sys_core::SysCode;
    codeMask: sys_core::SysCode;
    required exprSelect: str;
    constraint exclusive on (.name);
  }

  type SysDataObjFieldListSelect extending sys_core::SysObj {
     actionsFieldGroup: sys_core::SysDataObjActionGroup {
      on target delete allow;
    }
    required btnLabelComplete: str;
    required dataObjDisplay: sys_core::SysDataObj {
      on source delete delete target if orphan;
    };
    required dataObjSelect: sys_core::SysDataObj {
      on source delete delete target if orphan;
    };
    required isMultiSelect: bool;
    constraint exclusive on (.name);
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
    
  function getDataObjActionGroup(name: str) -> optional sys_core::SysDataObjActionGroup
    using (select sys_core::SysDataObjActionGroup filter .name = name);        
      
  function getDataObjFieldListConfig(name: str) -> optional sys_core::SysDataObjFieldListConfig
    using (select sys_core::SysDataObjFieldListConfig filter .name = name);
  
  function getDataObjFieldListItems(name: str) -> optional sys_core::SysDataObjFieldListItems
    using (select sys_core::SysDataObjFieldListItems filter .name = name);  
    
  function getDataObjFieldListSelect(name: str) -> optional sys_core::SysDataObjFieldListSelect
    using (select sys_core::SysDataObjFieldListSelect filter .name = name);
  
  function getNodeObjByName(nodeObjName: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional sys_core::SysNodeObj
    using (select sys_core::SysNodeObj filter .id = <uuid>nodeObjId);     
    
  function isObjectLink(objName: str, linkName: str) -> optional bool
    using (select count(schema::ObjectType filter .name = objName and .links.name = linkName) > 0);     

  # <todo> migrate itemsList to functions rather than raw selects
  # have to beable to return an array from a function
  # function getItemsListCodeByCodeTypeName() -> array<Code>
  #     using (select Code );
}
