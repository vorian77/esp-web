CREATE MIGRATION m1hiupzgtdtvarr4gawd34pkwcvi3eamwui2aerl5p7o3bbfdthnsa
    ONTO m1wv72h53wzk5zrheygsc7bxwtqw6lbxwbc6m7kx5amyh3lfttiu5q
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER LINK item {
          RENAME TO items;
      };
  };
};
