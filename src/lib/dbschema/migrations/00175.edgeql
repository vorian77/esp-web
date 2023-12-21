CREATE MIGRATION m1jalrajjljjbo5saa4f4zggjlqrqb6ul4vicb67daa7hkpgsz2adq
    ONTO m1byv5c3plmv2otbjjgqjyomtlk2twj4h7bkmpevzdbh7dwbcakilq
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY nameAlt: std::str;
  };
};
