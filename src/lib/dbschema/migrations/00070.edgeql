CREATE MIGRATION m1zt5kpn4kov4hqk23seexzh2uofidrcqrjcp4a5trp7d6d7qqkqqa
    ONTO m1fh7ecujddinhj6jsrwsebytzz2y6trirh5qihmu36njitk7a7mxq
{
  ALTER TYPE sys_core::Code {
      ALTER PROPERTY order {
          RENAME TO index;
      };
  };
};
