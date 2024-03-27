CREATE MIGRATION m12p7og66x7e6bo57itjapclyuonvbmj3bkephqvzxmuvoqro4mjla
    ONTO m16s2zrnwfgyuu3ghgwgwlfddjpxyukn32utofta5pci4ht5l7egxa
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER PROPERTY confirm {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
