module sys_db{
  type Column extending sys_core::Obj {
    headerSide: str;
    expr: str;
    required width: int16;
    required hRows: int16;
    required codeAlignment: sys_core::Code;
    required codeDataType: sys_core::Code;
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
    constraint exclusive on (.name);
  }

  type Table extending sys_core::Obj {
    required hasMgmt: bool;
    multi columns: Column{
      isRequired: bool;
      isIdentity: bool;
      on source delete allow;
      constraint exclusive;
    };
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