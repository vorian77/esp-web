module sys_app {
  abstract type SysAppNodeType extending default::Mgmt {
    required owner: sys_core::SysEnt;
    required name: default::Name;
    name_display: str;
  }

   type SysAppProgram extending SysAppNodeType {
    required order: default::non_negative;
    constraint exclusive on ((.owner, .name));
  }

  type SysAppNode extending SysAppNodeType {
    required program: SysAppProgram;
    required parent: SysAppNodeType;
    required order: default::non_negative;
    multi objs: SysAppNodeObj;
    constraint exclusive on ((.program, .name ));
  }

  scalar type SysAppNodeObjType extending enum<FORM_LIST, FORM_DETAIL, FORM_TEST>;
  
  abstract type SysAppNodeObj extending SysAppNodeType {
    obj_type: SysAppNodeObjType;
    sub_header: str;
    description: str;
    constraint exclusive on ((.owner, .name, .obj_type ));
  } 

  type SysForm extending SysAppNodeObj {
    submit_button_label: str;
  }
 
  function getAppProgram(ownerName: str, programName: str) -> optional SysAppProgram
      using (select SysAppProgram filter .owner = (select sys_core::getEnt(ownerName)) and .name = programName);

  function getAppNode(
    programOwnerName: str, 
    programName: str,
    nodeName: str) -> optional SysAppNode
      using (select SysAppNode filter 
        .program = (select getAppProgram(programOwnerName, programName)) and
        .name = nodeName
  );

  function getAppForm(
    formOwnerName: str, 
    formName: str, 
    formObjType: SysAppNodeObjType) -> optional SysForm
      using (select SysForm filter 
        .owner = (select sys_core::getEnt(formOwnerName)) and 
        .name = formName and
        .obj_type = formObjType
  );

}

