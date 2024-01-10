CREATE MIGRATION m1lmq3izp6t7acnx3mpb7kaolwezkre76hm3wcytpshvfxftguvs7q
    ONTO m16kevrc4z2vlok7twbjfjckxdjjpnutg27culshel4vfwfchwxdxa
{
  ALTER TYPE sys_core::Org {
      DROP LINK userTypeDefault;
  };
};
