CREATE MIGRATION m153rs6ygkehjo42nhi35zcodjhjlfelan4rmhdg7rrlwdb5hig4eq
    ONTO m17qb4nflbuc44xp4oghy3hzc3w27wwickjurkrl6pp3u62qtwemwq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK itemsDb {
          RENAME TO fieldItems;
      };
  };
};
