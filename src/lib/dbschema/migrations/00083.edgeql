CREATE MIGRATION m1fudawqjs3dacu3ke7fo7smcskaiczqt4qhaflacjxvfb34mkhsxq
    ONTO m1empvp6xi73lvmr4bvil2tzdbwgzw6z4z4ejrispq3rxoyk5xkswa
{
  ALTER TYPE app_cm::CmCohort {
      CREATE PROPERTY dateEnd: cal::local_date;
      CREATE PROPERTY dateStart: cal::local_date;
  };
};
