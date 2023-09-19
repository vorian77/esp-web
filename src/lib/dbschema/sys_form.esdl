module sys_form{
  type Form extending sys_app::NodeObj {
    subHeader: str;
    description: str;
    multi fields: sys_form::FormField;
    multi actions: FormAction;
  }

  type FormField {
    required name: str;
    required label: str;
  }

  type FormAction {
    required codeType: sys_core::Code;
    required query: str;
    multi filterItems: sys_form::FormActionItem;
  }

  type FormActionItem {
    required dbName: default::Name;
    codeSource: sys_core::Code;
    sourceKey: str;
    codeDataType: sys_core::Code; 
    codeOp: sys_core::Code; 
  }
}