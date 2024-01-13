module sys_db{
  type SysColumn extending sys_core::SysObj {
    classValue: str;
    codeAlignment: sys_core::SysCode;
    required codeDataType: sys_core::SysCode;
    codeDataTypeComputed: sys_core::SysCode;
    edgeTypeDefn: json;
    exprPreset: str;
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
    maxValue: float64;
    minLength: default::nonNegative;
    minValue: float64;
    pattern: str;
    patternMsg: str;
    patternReplacement: str;
    placeHolder: str;
    spinStep: str;
    constraint exclusive on (.name);
  }

  type SysTable extending sys_core::SysObj {
    multi columns: sys_db::SysColumn;
    required hasMgmt: bool;
    required mod: str;
    constraint exclusive on (.name);
  }

  # FUNCTIONS
  function getColumn(columnName: str) -> optional sys_db::SysColumn
    using (select sys_db::SysColumn filter .name = columnName);

  function getTable(tableName: str) -> optional sys_db::SysTable
    using (select sys_db::SysTable filter .name = tableName);
}