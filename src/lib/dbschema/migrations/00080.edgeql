CREATE MIGRATION m1kvcrb7g2yequ6arz4sylre3dbd4lnqivabqagbcf4opzekp25ytq
    ONTO m1pg3yvpn3v2yl5ttu2mdvn5mqjep7dghle3msqit6azfaj7lecdga
{
  ALTER FUNCTION sys_core::getCode(codeTypeName: std::str, codeName: std::str) USING (SELECT
      std::assert_single(sys_core::Code FILTER
          ((.codeType.name = codeTypeName) AND (.name = codeName))
      )
  );
};
