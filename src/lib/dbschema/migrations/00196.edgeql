CREATE MIGRATION m1zrtgwnu5jx6s2fqn4hwacbgpqcr6fyth6cad2asyi2zefh6jpvaa
    ONTO m1spc55ozdjuz3ty4d4bywc2e4qcsdabsr3qrdioestqhthkxcfv7a
{
  ALTER TYPE sys_db::Column {
      ALTER LINK codeDataTypePreset {
          RENAME TO codeDataTypeComputed;
      };
  };
};
