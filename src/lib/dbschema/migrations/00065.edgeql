CREATE MIGRATION m13ticc5vdvmo2lg2wlquwsstb47cc73rej7vwznkjqhqy4dwhnszq
    ONTO m1zkbepxrm7c4qiajrqyzfrvbcusr3xbkwehngv7fwbeh3sgfowqmq
{
  ALTER TYPE sys_obj::FormFieldItemsElement {
      ALTER PROPERTY itemId {
          SET TYPE std::str USING (<std::str>.itemId);
      };
  };
  ALTER TYPE sys_obj::FormFieldItemsElement {
      ALTER PROPERTY label {
          RENAME TO itemLabel;
      };
  };
};
