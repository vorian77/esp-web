CREATE MIGRATION m1selkuual2igdpwed6hoc3wagfkqfqlm3sqao5vuymfp5cn6wlxqa
    ONTO m1uk4nz2h2mu3ts5fjmshdb5sacfcbn3k5ha562aoulrcqysp7fx2q
{
  ALTER TYPE sys_core::CodeType {
      CREATE LINK parent: sys_core::CodeType;
  };
};
