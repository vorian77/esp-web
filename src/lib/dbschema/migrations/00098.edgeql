CREATE MIGRATION m1hzx3lumecmucxml7ofged47ub4xlwnwx5zlclomfehyy3inqqvoa
    ONTO m1sszuzh2koclfuekou5ihz2lifvfsrj3yzywwnyzql3whr3hmtroq
{
  ALTER TYPE sys_obj::Form {
      CREATE PROPERTY link: std::json;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      CREATE PROPERTY isLinkMember: std::bool;
  };
  ALTER TYPE sys_obj::FormFieldDb {
      DROP PROPERTY link;
  };
};
