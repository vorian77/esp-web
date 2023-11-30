CREATE MIGRATION m1lhopachx3o2y7vgz7vj5k2ubeulffgqxpwnvvcpzyv2h7joi2xpa
    ONTO m1zqn7irjsdhnvnpnjw7d2my5cn52pv6mumdxy7w35vqbpzrz3liuq
{
  ALTER TYPE sys_core::Org {
      ALTER LINK userTypeDefault {
          ON TARGET DELETE ALLOW;
      };
  };
};
