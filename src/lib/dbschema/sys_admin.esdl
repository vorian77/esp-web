module sys_admin{
  type SaObjConfig extending sys_core::SysObj {
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
}
