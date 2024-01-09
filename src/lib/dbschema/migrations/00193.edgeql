CREATE MIGRATION m1umddl4a5kdfvwsuz32o4ez5mbysjsbei3cwakynyv3s2zmne5j4q
    ONTO m1p3e3m7u5lokykgqmtqkmclbkpydbiqcddbhgkbjptcqbo6lq67tq
{
  ALTER TYPE sys_admin::ObjConfig {
      ALTER PROPERTY detailOrder {
          SET TYPE std::int16 USING (<std::int16>.detailOrder);
      };
      ALTER PROPERTY listOrder {
          SET TYPE std::int16 USING (<std::int16>.listOrder);
      };
  };
};
