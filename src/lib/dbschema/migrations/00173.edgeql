CREATE MIGRATION m1r4p36tvatnpra724gqhinew3bowtyl3wkh5degsnmka2cvwvpobq
    ONTO m14ae43ijqppfrh3ub53fk2tu66z7lcl3g5c7eqmlt2yneiyh2ce5a
{
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE PROPERTY dbOrderSelect: default::nonNegative;
  };
};
