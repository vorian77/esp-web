CREATE MIGRATION m1spc55ozdjuz3ty4d4bywc2e4qcsdabsr3qrdioestqhthkxcfv7a
    ONTO m1wchpnvwx5tvbh7aslylfbji3j4u2tz7l47tdqpkith6t47bsgeaa
{
  ALTER TYPE sys_admin::ObjConfig {
      CREATE PROPERTY hasMgmt: std::bool;
  };
};
