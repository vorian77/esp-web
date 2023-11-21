CREATE MIGRATION m1lddbksjln62ats7hitooyj2gcxgib5famuoamlt2mbdbaot6t2yq
    ONTO m1vvfwmmli63kha2q4by7zi3o2gzx3tu42dmjrhd27pshsivayphsq
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY expr;
  };
};
