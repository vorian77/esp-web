CREATE MIGRATION m1eunj4cvb24cu6pssu2cdopeiyjihygal2tunor2sonhkj345itpq
    ONTO m16gctanqvwx5oollpwoegckvk5moyw5b2m6tkac762ye7n2hgq4tq
{
  ALTER TYPE sys_core::SysCode {
      ALTER PROPERTY valueDecimal {
          SET TYPE std::float64 USING (<std::float64>.valueDecimal);
      };
  };
};
