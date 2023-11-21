CREATE MIGRATION m1hrvtxj6znlryzeyzfhlk7nyslq22rlf2f2aoqkx7uzkrllwnc2vq
    ONTO m1zgc37thnapdo2pocppdajvmbdaeohko24gbmuor4etqaikqyxdka
{
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY imageWidth;
  };
};
