module sys_obj{
  type NodeObj extending sys_core::Obj {
    required codeType: sys_core::Code;
    parent: NodeObj;
    required order: default::nonNegative;
    required codeIcon: sys_core::Code;
    page: str;
    dataObj: sys_obj::DataObj {
      on target delete allow
    };
    constraint exclusive on (.name);
  }

  type DataObjAction extending sys_core::Obj {
    allTabs: bool;
    color: str;
    required order: default::nonNegative;
    constraint exclusive on (.name);
  }

  type DataObj extending sys_core::Obj {
    multi actions: DataObjAction;
    required codeCardinality: sys_core::Code;
    required codeComponent: sys_core::Code;
    description: str;
    exprFilter: str;
    exprObject: str;
    multi fieldsDb: sys_obj::DataObjFieldDb {
      on source delete delete target;
    };
    multi fieldsEl: sys_obj::DataObjFieldEl {
      on source delete delete target;
    };
    isPopup: bool;
    link: json;
    subHeader: str;
    table: sys_db::Table;  
    constraint exclusive on (.name);
  } 
  
  type DataObjFieldDb {
    codeDbDataOp: sys_core::Code;
    codeDbDataSource: sys_core::Code;
    codeDbListDir: sys_core::Code;
    required column: sys_db::Column {
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

  type DataObjFieldEl {
    required column: sys_db::Column {
      on source delete allow;
    };   
    codeAccess: sys_core::Code;
    codeCustomElType: sys_core::Code;
    codeElement: sys_core::Code;
    customElParms: json;
    dbOrderCrumb: default::nonNegative;
    dbOrderSelect: default::nonNegative;
    headerAlt: str;
    height: int16;
    isDisplay: bool;
    isDisplayable: bool;
    items: array<json>;
    itemsList: DataObjFieldItems{
     on source delete allow;
    };
    itemsListParms: json;
    width: int16;
  }

 type DataObjFieldItems extending sys_core::Obj {
    required dbSelect: str;
    required propertyId: str;
    required propertyLabel: str;
    multi fieldsDb: sys_obj::DataObjFieldDb {
      on source delete delete target;
    };
    constraint exclusive on (.name);
 }

  # FUNCTIONS
  function getDataObj(dataObjName: str) -> optional DataObj
    using (select DataObj filter .name = dataObjName);        
    
  function getDataObjAction(dataObjActionName: str) -> optional DataObjAction
    using (select DataObjAction filter .name = dataObjActionName);        
    
  function getDataObjFieldItems(name: str) -> optional DataObjFieldItems
    using (select DataObjFieldItems filter .name = name);  
    
  function getNodeObjByName(nodeObjName: str) -> optional NodeObj
    using (select NodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional NodeObj
    using (select NodeObj filter .id = <uuid>nodeObjId);     
}