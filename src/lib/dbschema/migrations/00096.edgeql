CREATE MIGRATION m1ouxmx6plpbkkwtdpxxm6rddlzvi2uogca5ue7xrndrruij7bwpmq
    ONTO m1sspc2wkzy7wblnr6xyukd65iiyja7r4nvuisxthwkmu5lipbh7yq
{
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE PROPERTY link: std::json;
  };
};
