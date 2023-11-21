CREATE MIGRATION m1sobf3wiagifzq7vyhl6phyy5dfus53xzb25expixftknfavzdmoq
    ONTO m1mfac2trnrz6kdkcm2vazieqn5yzokxgxpbm5lr7s7e4jdnxtqh7a
{
  ALTER TYPE sys_obj::FormField RENAME TO sys_obj::FormFieldDb;
};
