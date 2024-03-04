CREATE MIGRATION m1xxylrbddnm6udsll53s4ofvi3p6acpjm33777ujvwumq2jqge7tq
    ONTO m1czcr4slqxfvfqk723vsis2cbvy3uaneoo2lo4x6pnmfh55s6avzq
{
  ALTER TYPE app_cm::CmCsfDocument {
      ALTER PROPERTY isShareWithClient {
          SET TYPE std::str USING (<std::str>.isShareWithClient);
      };
  };
};
