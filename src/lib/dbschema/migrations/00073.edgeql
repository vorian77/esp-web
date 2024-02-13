CREATE MIGRATION m1cwewvcdeqdeb3t46jovmb2mtt4wcepdgk3aehwhdzcbtavdhuqua
    ONTO m1wqqfnpnt6olv27npy76h3qn76cxit2xjbo7clczlknpuqi5uxbsa
{
  CREATE TYPE app_cm::CmCsfJobPlacement EXTENDING app_cm::CmCsfData {
      CREATE REQUIRED PROPERTY date: cal::local_date;
      CREATE PROPERTY note: std::str;
  };
};
