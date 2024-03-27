CREATE MIGRATION m16s2zrnwfgyuu3ghgwgwlfddjpxyukn32utofta5pci4ht5l7egxa
    ONTO m1oehg3ikzicuclcosqqvqsj6ljnqsc2zhavzy4ia72lug77d4yeta
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK actionsField;
  };
};
