CREATE MIGRATION m1oczmds2lobszogohgfsj6x4q7fdss3oo53sapypxz4llgcley4rq
    ONTO m1hrvtxj6znlryzeyzfhlk7nyslq22rlf2f2aoqkx7uzkrllwnc2vq
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY exprPreselect;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      DROP LINK codeInputType;
      DROP PROPERTY buttonLabel;
      DROP PROPERTY classValue;
      DROP PROPERTY dynamicLabelKey;
      DROP PROPERTY imageAltText;
      DROP PROPERTY staticLabel;
  };
};
