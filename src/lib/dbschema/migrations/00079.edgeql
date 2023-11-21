CREATE MIGRATION m1pg3yvpn3v2yl5ttu2mdvn5mqjep7dghle3msqit6azfaj7lecdga
    ONTO m1z6mzmyhntcg2dtihsmyyxhpuazimxc6agpbc4o53lgcemo4etgjq
{
  ALTER TYPE sys_core::Code {
      ALTER PROPERTY index {
          RENAME TO order;
      };
  };
  ALTER TYPE sys_core::CodeType {
      ALTER PROPERTY index {
          RENAME TO order;
      };
  };
};
