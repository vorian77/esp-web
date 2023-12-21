CREATE MIGRATION m1byv5c3plmv2otbjjgqjyomtlk2twj4h7bkmpevzdbh7dwbcakilq
    ONTO m1r4p36tvatnpra724gqhinew3bowtyl3wkh5degsnmka2cvwvpobq
{
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY dbOrderSelect;
  };
};
