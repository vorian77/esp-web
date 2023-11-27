CREATE MIGRATION m143rdhnxvcaytymnh5ph3gbcl3bkube3c6ew6e4nqetqb3zuk7ekq
    ONTO m1nuptfqcxo4zwcptq5jav6ucznttgad7emxk25gsu4ldtckcd675a
{
  ALTER TYPE sys_core::Code {
      CREATE PROPERTY valueDecimal: std::decimal;
      CREATE PROPERTY valueInt: std::int64;
      CREATE PROPERTY valueStr: std::str;
  };
};
