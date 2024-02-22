CREATE MIGRATION m1z33xf66q5lwzmv2wk2xboksbak6k4wj4ilqdogtdht5kt7nsn27q
    ONTO m1xen4t6jswixqot3hp5kf5pxsr4dq2odd62mc4nzbmkutc5z7rlta
{
  ALTER TYPE app_cm::CmCohort {
      CREATE PROPERTY cost: std::float32;
  };
};
