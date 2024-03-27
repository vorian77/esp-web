CREATE MIGRATION m17lgr2i66srzjbxhyulh5kr7wjehicqnyculi3pbvbpj6zvwdiiva
    ONTO m1z33xf66q5lwzmv2wk2xboksbak6k4wj4ilqdogtdht5kt7nsn27q
{
  ALTER TYPE app_cm::CmCourse {
      DROP PROPERTY cost;
  };
};
