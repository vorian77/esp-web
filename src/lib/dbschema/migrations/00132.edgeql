CREATE MIGRATION m1frktnrmamp6kosbm4b6fsw47otapoozx2pcgneqel7hf6eb5tvoa
    ONTO m1ph4ygfmtxo6aijb442wnfwbfqwylkwod43bdbcxkd7ekwuo6svha
{
  ALTER TYPE sys_core::SysDataObjFieldListConfig {
      DROP PROPERTY btnLabelComplete;
  };
};
