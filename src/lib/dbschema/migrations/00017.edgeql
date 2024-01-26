CREATE MIGRATION m134crispb5qh76bsor2joz5h3hqbvwedkhndk6qp3ia5f5ughqaxa
    ONTO m15fiphwm34sl7raqyhn6eo4tga3vzpwl7kqk5nqowtgvrumqoj7xq
{
  ALTER TYPE sys_core::SysDataObj {
      DROP LINK subTables;
  };
  ALTER TYPE sys_core::SysDataObjFieldDb {
      ALTER LINK tables {
          SET TYPE sys_db::SysTable USING (.tables[IS sys_db::SysTable]);
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEl {
      ALTER LINK tables {
          SET TYPE sys_db::SysTable USING (.tables[IS sys_db::SysTable]);
      };
  };
};
