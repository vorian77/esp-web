CREATE MIGRATION m1krwojqp4mnzqokmcuspymcvuzob33mims3tattdhwqx23xqbctoa
    ONTO m16kf3yakrwykynvgygn3w5yiaa5ntnehmh5wuapwjdfcometpoboq
{
  ALTER TYPE sys_obj::DataObj {
      DROP LINK codeRenderType;
  };
};
