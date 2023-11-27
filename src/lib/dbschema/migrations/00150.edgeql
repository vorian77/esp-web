CREATE MIGRATION m16inm7x3ynu2fhpp2khtdgbc7ckgrcdwkl3jqvln5u2icbcttypmq
    ONTO m1wulpjhrmyr4b7wfdf3mpqd6wvfjt2dheq24cnjat74ssis3bpnxa
{
  ALTER TYPE sys_obj::Form {
      CREATE PROPERTY exprFilter: std::str;
  };
};
