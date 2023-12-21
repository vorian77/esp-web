CREATE MIGRATION m1jtyzgedktzssog4ixomchahxxzlw5xciilyuw6yhg77h6l6fuhka
    ONTO m1hows3ugfuadz4tua53zwgx5ojm2qry35h2zncou3jcqhgs3b2ija
{
  ALTER TYPE app_cm::Client {
      ALTER PROPERTY agencyId {
          RESET OPTIONALITY;
      };
  };
};
