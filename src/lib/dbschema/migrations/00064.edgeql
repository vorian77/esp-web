CREATE MIGRATION m1zkbepxrm7c4qiajrqyzfrvbcusr3xbkwehngv7fwbeh3sgfowqmq
    ONTO m1ou5cguiflq5k3ghutb3k7uhhjtsotssh3wg2vghtywhe5p3bdvvq
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY dbOrderSelect: default::nonNegative;
  };
};
