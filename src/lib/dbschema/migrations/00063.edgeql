CREATE MIGRATION m1ou5cguiflq5k3ghutb3k7uhhjtsotssh3wg2vghtywhe5p3bdvvq
    ONTO m1yjqycirt7r5i3f3d6oar6cq2rnx7e6qupj5u2kszyuytvt3q4dtq
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER LINK itemsList {
          ON SOURCE DELETE ALLOW;
          RESET CARDINALITY USING (SELECT
              .itemsList 
          LIMIT
              1
          );
      };
  };
};
