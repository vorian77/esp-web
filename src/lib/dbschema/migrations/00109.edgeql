CREATE MIGRATION m12ljksfb5bwdspqdgpgayfb5ubifxvhp2pglgzkrirl4hodo4wjda
    ONTO m1bdwakgtl42ytw473w22zie7x2ty6fgwwa3p455f6einlgpta62qa
{
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY items;
  };
};
