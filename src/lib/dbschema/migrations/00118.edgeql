CREATE MIGRATION m1dt2pf6orpukgc5pgpxckacevyz33u54nv32rpiviihyeyax65jyq
    ONTO m1m5wfasna5w2qd3t7hwawwd42h7xlbskzpndraemcnuwmgoq2ufba
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER PROPERTY hdrLabelDynamicKey {
          RENAME TO labelDynamicKey;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER PROPERTY hdrLabelDynamicSource {
          RENAME TO labelDynamicSource;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER PROPERTY hdrLabelStatic {
          RENAME TO labelHeader;
      };
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY labelText: std::str;
  };
};
