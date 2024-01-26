CREATE MIGRATION m12nf52rght63i7ywkhz43amdj6f3zrucq4ey523btfa5a3rd6nmwa
    ONTO m15iwzqyojps6ndwezzdtwjwcshkuntrn36wb5fuhkxqjrtfto2xga
{
  ALTER TYPE sys_core::SysDataObjTable {
      ALTER PROPERTY index {
          SET TYPE std::str USING (<std::str>.index);
      };
      ALTER PROPERTY indexParent {
          SET TYPE std::str USING (<std::str>.indexParent);
      };
  };
};
