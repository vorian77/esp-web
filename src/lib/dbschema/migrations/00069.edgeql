CREATE MIGRATION m1fh7ecujddinhj6jsrwsebytzz2y6trirh5qihmu36njitk7a7mxq
    ONTO m1zn7rkzcxxuyiyaukjbqylh3iutdeqcdfpwmd5ifzsqmaqhvzd5ha
{
  ALTER TYPE sys_core::Code {
      CREATE PROPERTY order: default::nonNegative;
      CREATE PROPERTY value: std::str;
  };
};
