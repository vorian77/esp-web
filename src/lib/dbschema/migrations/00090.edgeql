CREATE MIGRATION m1wvgvmqz7n74hwreu2rr3vtmxgkpfnwakytrizly2jykbeljae5xa
    ONTO m153rs6ygkehjo42nhi35zcodjhjlfelan4rmhdg7rrlwdb5hig4eq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER PROPERTY itemsDbParms {
          RENAME TO fieldItemsParms;
      };
  };
};
