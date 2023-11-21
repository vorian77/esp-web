CREATE MIGRATION m1zmbiioik3e2wqaqsstc7duofzlh76ziyg3e4zif4rhdjbitoz7ua
    ONTO m1yhsubhlznoks4phab5bo5zftpgdbppjq7hf5qeyzqe224c2tnhvq
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER LINK items {
          ON SOURCE DELETE DELETE TARGET;
      };
      ALTER LINK itemsList {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
