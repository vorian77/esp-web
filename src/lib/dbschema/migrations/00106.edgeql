CREATE MIGRATION m1mz6gaiehwt2mpexgf3xbmjo3eu77sno3qizzghu3sjkieinpkega
    ONTO m1kix32idrjmnxkbanu7awdhd6zdysp5bwtxh4k2y3dmqbolab26ja
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY edgeTypeDefn: std::json;
  };
};
