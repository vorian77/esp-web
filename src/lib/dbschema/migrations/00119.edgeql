CREATE MIGRATION m1oehg3ikzicuclcosqqvqsj6ljnqsc2zhavzy4ia72lug77d4yeta
    ONTO m1yehzf6o45utug2s7qs3jxgzss5eb6c5zovnyyfmhrxw6vipr6bxq
{
  ALTER TYPE sys_core::SysDataObjAction {
      CREATE PROPERTY confirm: std::bool;
      CREATE PROPERTY confirmButtonLabel: std::str;
      CREATE PROPERTY confirmMsg: std::str;
      CREATE PROPERTY confirmTitle: std::str;
  };
};
