CREATE MIGRATION m12sirlrxjz5sk25ngietkixtjrbbi4seqrlgchfmhavhsopz77ivq
    ONTO m13togdfcjzmxwamqgrr2c3qpcz6dfcqg3yksefhawlknagz2774za
{
  ALTER TYPE sys_user::User {
      ALTER LINK person {
          ON TARGET DELETE ALLOW;
      };
  };
};
