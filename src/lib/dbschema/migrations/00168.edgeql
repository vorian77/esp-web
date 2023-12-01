CREATE MIGRATION m1tnrwtoxhauuudln6w6pu5rz3grhjycgb3n3joovlymo6uexwnv5q
    ONTO m1il4zg3l2f5rcedqzwpbvjfdabdfpdbg5u6sgithsrdij4iikuuia
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY exprSelect: std::str;
      CREATE PROPERTY nameAlt: std::str;
  };
};
