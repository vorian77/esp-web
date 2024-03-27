CREATE MIGRATION m1pdlwran4bamyqdbvqg6exq4w5zzqsxdv436ktvhudu3knkmqg4kq
    ONTO m1d2rcfkcnkk7zlxux4f2rsfgy32lj6x5yj36f3qkar26236x7yhtq
{
  ALTER FUNCTION sys_core::getDataObjFieldItems(name: std::str) {
      RENAME TO sys_core::getDataObjFieldListItems;
  };
};
