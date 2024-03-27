CREATE MIGRATION m1iklefcet35hb3vzy3z6scniwoqdlplm3nrkcjfybg4qgqll2pplq
    ONTO m1zujjgifon5kzthw2ihqk5zio273kewxwxkhqagqk4nbkuzh5r3sq
{
  ALTER TYPE sys_core::SysDataObjAction {
      ALTER LINK actionType {
          RENAME TO codeActionType;
      };
  };
};
