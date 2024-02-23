CREATE MIGRATION m1e6lavvpndiimpa37dk5qytm4g34ji7ctbphxefom2jiq64luw3tq
    ONTO m1pdlwran4bamyqdbvqg6exq4w5zzqsxdv436ktvhudu3knkmqg4kq
{
  ALTER TYPE sys_core::SysDataObjFieldChips RENAME TO sys_core::SysDataObjFieldListChips;
  ALTER FUNCTION sys_core::getDataObjFieldChips(name: std::str) {
      RENAME TO sys_core::getDataObjFieldListChips;
  };
};
