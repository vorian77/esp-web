CREATE MIGRATION m1yhsubhlznoks4phab5bo5zftpgdbppjq7hf5qeyzqe224c2tnhvq
    ONTO m177evj7aq5muzqm7ciomkf2rdcyrxt57lnexv3b2fjsamjzik5bhq
{
  ALTER TYPE sys_obj::FormFieldItemsList {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  CREATE FUNCTION sys_obj::getFormFieldItemsList(name: std::str) -> OPTIONAL sys_obj::FormFieldItemsList USING (SELECT
      sys_obj::FormFieldItemsList
  FILTER
      (.name = name)
  );
};
