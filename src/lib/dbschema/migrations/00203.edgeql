CREATE MIGRATION m1xxsfgjof4hz5zfsuqgkncshz7ggtqjcmd655ebsme66jwxcpocrq
    ONTO m1n3wzbr232mwq5dj72qa6urdwu4ypar4y2pdgloq3qo4nynup3cna
{
  ALTER FUNCTION sys_user::getRootUser() USING (SELECT
      std::assert_single((SELECT
          sys_user::UserRoot
      FILTER
          (.userName = '*ROOTUSER*')
      ))
  );
};
