CREATE MIGRATION m1lf3ocowlrknspf3gkqnvesjgakrwbnpg3ff4j67y6ueyazzo7buq
    ONTO m12ljksfb5bwdspqdgpgayfb5ubifxvhp2pglgzkrirl4hodo4wjda
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY items: array<std::json>;
  };
};
