CREATE MIGRATION m1jsepnv34visufnc27uoglm3hs3zyiwxdhztbss25eg3zkfpvd3tq
    ONTO m1hykt7rn7jbxmzopiquuwg5j6ckyh4gs6hsiepl5siylntrgpds5a
{
  ALTER TYPE sys_core::Org {
      CREATE PROPERTY appName: std::str;
  };
};
