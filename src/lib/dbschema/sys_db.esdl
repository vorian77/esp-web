module sys_db{
  type Column extending sys_core::Obj {
    classValue: str;
    codeAlignment: sys_core::Code;
    required codeDataType: sys_core::Code;
    codeDataTypePreset: sys_core::Code;
    edgeTypeDefn: json;
    exprPreset: str;
    exprSave: str;
    exprSelect: str;
    exprStorageKey: str;
    headerSide: str;
    isExcludeInsert: bool;
    isExcludeSelect: bool;
    isExcludeUpdate: bool;
    isMultiSelect: bool;
    isSetBySys: bool;
    matchColumn: str;
    maxLength: default::nonNegative;
    maxValue: default::nonNegative;
    minLength: default::nonNegative;
    minValue: default::nonNegative;
    pattern: str;
    patternMsg: str;
    patternReplacement: str;
    placeHolder: str;
    constraint exclusive on (.name);
  }

  type Table extending sys_core::Obj {
    mod: str;
    required hasMgmt: bool;
    multi columns: Column;
    constraint exclusive on ((.owner, .name));
  }

  # FUNCTIONS
  function getColumn(columnName: str) -> optional Column
    using (select Column filter .name = columnName);

  function getTable(ownerName: str, tableName: str) -> optional Table
    using (select Table filter 
       .owner = (select sys_core::getEnt(ownerName)) and 
       .name = tableName);
}