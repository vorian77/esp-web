CREATE MIGRATION m13rj4ddpixc4vmvxwukdejysszd44ophmaahd73eifvt2ywxqtd4q
    ONTO m1266sg5jryv5di6itepa335oow7ydtiylxirjbnnkkymc4hykonsq
{
  ALTER TYPE sys_obj::DataObj {
      CREATE LINK codeType: sys_core::Code;
  };
};
