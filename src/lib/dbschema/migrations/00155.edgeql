CREATE MIGRATION m1qn5bm46ukxxnuhuribtg4dvd5oe6tv3wekcjgxijdq2atqzjeosa
    ONTO m1lusm2ixzrlegggzsvoq3dfpvdjatrrpgt7p7h5qtggwcg2x2je4a
{
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY isDbListOrderField;
  };
};
