CREATE MIGRATION m1mml67qmd6jvkdzbjs5qc5l7swdbfh2ds32f2wgrcs2dhv3fg6wsa
    ONTO m134crispb5qh76bsor2joz5h3hqbvwedkhndk6qp3ia5f5ughqaxa
{
  ALTER TYPE sys_core::SysDataObjFieldEl {
      DROP LINK tables;
  };
};
