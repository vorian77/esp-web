module sys_app {
  type Program extending sys_core::Obj {
    required order: default::non_negative;
    code_icon: sys_core::Code;
    constraint exclusive on (.name);
  }

  type Node extending sys_core::Obj {
    required program: Program;
    required code_type: sys_core::Code;
    parent: Node;
    required order: default::non_negative;
    code_icon: sys_core::Code;
    multi objs: NodeObj {
      obj_type: NodeObjType;
    };
    constraint exclusive on ((.program, .name));
  }

  scalar type NodeObjType extending enum<CUSTOM, FORM_COMPOSITE, FORM_DETAIL, FORM_LIST, PAGE>;

  abstract type NodeObj extending sys_core::Obj {
    sub_header: str;
    description: str;
    constraint exclusive on ((.name));
  } 

  type Form extending NodeObj {
    submit_button_label: str;
  }

  type Page extending NodeObj {
    required link: default::Name;
  }

  # FUNCTIONS
  function getProgram(programName: str) -> optional sys_app::Program
    using (select sys_app::Program filter .name = programName);

  function getNodeObj(nodeObjName: str) -> optional sys_app::NodeObj
    using (select sys_app::NodeObj filter .name = nodeObjName);
}

