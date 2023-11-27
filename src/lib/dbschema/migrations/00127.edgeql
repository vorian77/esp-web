CREATE MIGRATION m1xh2v7zemourrdbg23wgkru4aiqsey6teatiu6vzj2ztn2lukks6a
    ONTO m1nup7neo7u7ulbdnsxtkpojwn5z2tvr7lzfi7yea5jengpqi7maqa
{
  ALTER TYPE app_cm_training::Course {
      CREATE PROPERTY isActive: std::str;
  };
};
