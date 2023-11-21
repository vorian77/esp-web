CREATE MIGRATION m1sszuzh2koclfuekou5ihz2lifvfsrj3yzywwnyzql3whr3hmtroq
    ONTO m1ouxmx6plpbkkwtdpxxm6rddlzvi2uogca5ue7xrndrruij7bwpmq
{
  ALTER TYPE sys_obj::FormFieldDb {
      DROP LINK table;
      DROP LINK tableParent;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP LINK table;
      DROP LINK tableParent;
  };
};
