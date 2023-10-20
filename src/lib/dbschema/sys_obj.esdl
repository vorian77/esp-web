module sys_obj{
  type NodeObj extending sys_core::Obj {
    required codeType: sys_core::Code;
    parent: NodeObj;
    required order: default::nonNegative;
    required codeIcon: sys_core::Code;
    required page: str;
    dataObj: sys_obj::DataObj {
      on target delete allow
    };
    constraint exclusive on (.name);
  }

  abstract type DataObj extending sys_core::Obj {
    required codeCardinality: sys_core::Code;
    required codeComponent: sys_core::Code;
    multi actions: DataObjAction;
    constraint exclusive on (.name);
  } 

  type DataObjAction extending sys_core::Obj {
    required order: default::nonNegative;
    constraint exclusive on (.name);
  }
  
  type Form extending DataObj {
    table: sys_db::Table;
    subHeader: str;
    description: str;
    submitButtonLabel: str;
    isPopup: bool;
    multi fields: sys_obj::FormField {
      on source delete delete target;
    };
  }

  type FormField {
    required column: sys_db::Column {
      on source delete allow;
    };
    dbSelectOrder: default::nonNegative;
    codeElement: sys_core::Code;
    codeInputType: sys_core::Code;
    codeAccess: sys_core::Code;
    isDisplayable: bool;
    isDisplay: bool;
    dbName: str;
    codeDbDataSource: sys_core::Code;
    dbDataSourceKey: str;
    codeDbDataOp: sys_core::Code;
    isDbIdentity: bool;
    isDbSys: bool;
    isDbPreset: bool;
    isDbAllowNull: bool;
    isDbExcludeInsert: bool;
    isDbExcludeUpdate: bool;
    isDbListOrderField: bool;
    codeDbListDir: sys_core::Code;
    dbListOrder: default::nonNegative;
  }

  # FUNCTIONS
  function getDataObj(dataObjName: str) -> optional DataObj
    using (select DataObj filter .name = dataObjName);        
    
  function getDataObjAction(dataObjActionName: str) -> optional DataObjAction
    using (select DataObjAction filter .name = dataObjActionName);        
    
  function getNodeObjByName(nodeObjName: str) -> optional NodeObj
    using (select NodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional NodeObj
    using (select NodeObj filter .id = <uuid>nodeObjId);  
}