module sys_obj{
  abstract type NodeObj extending sys_core::Obj {
    required codeCardinality: sys_core::Code;
    required codeComponent: sys_core::Code;
    multi objActions: ObjAction;
    multi dataActions: DataAction{
      on source delete delete target;
    }
    constraint exclusive on (.name);
  } 

  type ObjAction extending sys_core::Obj {
    required order: default::nonNegative;
    constraint exclusive on (.name);
  }

  type DataAction {
    required codeType: sys_core::Code;
    query: str;
    multi items: DataActionItem {
      on source delete delete target;
    };
  }

  scalar type ct_sys_edgedb_data_type extending enum<bool, datetime, expr, int64, json, str, uuid>;
  scalar type ct_sys_data_action_item_source extending enum<calc, data, env, literal, traversal, user>;
  scalar type ct_sys_data_action_item_direction extending enum<asc, desc>;
  scalar type ct_sys_data_action_item_op extending enum<eq>;
  
  type DataActionItem {
    required dbName: str;
    codeDataType: ct_sys_edgedb_data_type; 
    codeDirection: ct_sys_data_action_item_direction;
    codeOp: ct_sys_data_action_item_op; 
    codeSource: ct_sys_data_action_item_source;
    fieldName: str;
    order: default::nonNegative;
    sourceKey: str;
  }

  type Form extending NodeObj {
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
    required codeAccess: sys_core::Code;
    codeElement: sys_core::Code;
    codeInputType: sys_core::Code;
    placeHolder: str;
    matchColumn: str;
    minLength: default::nonNegative;
    maxLength: default::nonNegative;
    minValue: default::nonNegative;
    maxValue: default::nonNegative;
    pattern: str;
    patternMsg: str;
    patternReplacement: str;
    staticLabel: str;
    dynamicLabel: str;
  }

  # FUNCTIONS
  function getNodeObjByName(nodeObjName: str) -> optional NodeObj
    using (select NodeObj filter .name = nodeObjName);

  function getNodeObjById(nodeObjId: str) -> optional NodeObj
    using (select NodeObj filter .id = <uuid>nodeObjId);

  function getObjAction(objActionName: str) -> optional ObjAction
    using (select ObjAction filter .name = objActionName);        
    
}