module sys_app {
  abstract type NodeObj extending sys_core::Obj {
    constraint exclusive on ((.name));
  } 

  type Node extending sys_core::Obj {
    required codeType: sys_core::Code;
    parent: Node;
    required order: default::nonNegative;
    required codeIcon: sys_core::Code;
    required page: str;
    codeComponent: sys_core::Code;
    obj: NodeObj {
      on target delete allow
    };
    constraint exclusive on ((.owner, .name));
  }

 type HomeScreenWidget extending sys_core::Obj {
    constraint exclusive on (.name);
  }

  type HomeScreen extending sys_core::Obj {
    multi widgets: HomeScreenWidget {
      on target delete allow;
    };
    constraint exclusive on (.name);
  }

  # FUNCTIONS
  function getNodeObj(nodeObjName: str) -> optional sys_app::NodeObj
    using (select sys_app::NodeObj filter .name = nodeObjName);
    
  function getNode(ownerName: str, nodeName: str) -> optional sys_app::Node
    using (select sys_app::Node filter 
      .owner = (select sys_core::getEnt(ownerName)) and
      .name = nodeName);
  
  function getHomeScreen(homeScreenName: str) -> optional sys_app::HomeScreen
    using (select sys_app::HomeScreen filter .name = homeScreenName);    

  function getHomeScreenWidget(widgetName: str) -> optional sys_app::HomeScreenWidget
    using (select sys_app::HomeScreenWidget filter .name = widgetName);        
}

  