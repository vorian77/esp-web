CREATE MIGRATION m1eydkwc4vpmckqc5fzllhvedxchb62rokjb2on3cw75mqguar3iuq
    ONTO m13ticc5vdvmo2lg2wlquwsstb47cc73rej7vwznkjqhqy4dwhnszq
{
  ALTER TYPE default::Person {
      ALTER PROPERTY ethnicity {
          SET TYPE std::str USING (<std::str>.ethnicity);
      };
      ALTER PROPERTY gender {
          SET TYPE std::str USING (<std::str>.gender);
      };
  };
  ALTER TYPE app_cm_training::Course {
      ALTER PROPERTY codeCategory {
          SET TYPE std::str USING (<std::str>.codeCategory);
      };
      ALTER PROPERTY isActive {
          SET TYPE std::str USING (<std::str>.isActive);
      };
  };
};
