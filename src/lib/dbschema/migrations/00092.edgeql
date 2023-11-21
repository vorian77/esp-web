CREATE MIGRATION m1kiwi5vslkdi4zzdglydh2og2rz7fak464732jytgsuzibwwhnqta
    ONTO m1qhmyxvyka4r5affgojlkxokynxpoifoujqbx2uurpmberjus5jkq
{
  ALTER TYPE sys_obj::FormFieldDb {
      ALTER LINK tableParent {
          RENAME TO parentTable;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER LINK tableParent {
          RENAME TO parentTable;
      };
  };
};
