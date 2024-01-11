CREATE MIGRATION m147zpdzjy6h77owp3477zi3wkzxd46t2res4iaoxtbzbermdnn7lq
    ONTO m1tgcjkcehfns2fbjjvs3bpynpurbmuugirzymdleu2oieinntexha
{
  ALTER TYPE default::Person {
      CREATE LINK codeEthnicity: sys_core::Code;
  };
  ALTER TYPE default::Person {
      DROP PROPERTY ethnicity;
  };
};
