CREATE MIGRATION m1ig7fg4bvl2x3r7xpgd2mt7rueo6dxbsomjslidlb6jeayyjreqyq
    ONTO m1eydkwc4vpmckqc5fzllhvedxchb62rokjb2on3cw75mqguar3iuq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY race {
          SET TYPE std::str USING (<std::str>.race);
      };
      ALTER PROPERTY state {
          SET TYPE std::str USING (<std::str>.state);
      };
  };
};
