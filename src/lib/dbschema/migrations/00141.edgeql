CREATE MIGRATION m1q7v3yp7ssauywttito6ojyxwagqkf3fyc5grbk34pf65ab2oaizq
    ONTO m1inya6dvxirdj4dk5jn5ia23fqfvt3o3sp6npwdp33outvh4zxxoa
{
  ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isPopup;
  };
};
