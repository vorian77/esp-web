CREATE MIGRATION m16plceto2d27cj4fd645cc227jf5djmssv7uoc6gsgppaixrajwua
    ONTO m1jhpiufhhteeoj6q3jghxnn6ferdnkhhqxhmk4kruq3e5mej7qbva
{
  ALTER TYPE sys_obj::Form {
      CREATE PROPERTY exprProcess: std::str;
  };
};
