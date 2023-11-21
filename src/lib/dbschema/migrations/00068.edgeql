CREATE MIGRATION m1zn7rkzcxxuyiyaukjbqylh3iutdeqcdfpwmd5ifzsqmaqhvzd5ha
    ONTO m1ig7fg4bvl2x3r7xpgd2mt7rueo6dxbsomjslidlb6jeayyjreqyq
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER PROPERTY itemsListParms {
          SET TYPE std::json USING (<std::json>.itemsListParms);
      };
  };
};
