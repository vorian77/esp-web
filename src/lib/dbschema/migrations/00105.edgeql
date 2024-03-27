CREATE MIGRATION m1czcr4slqxfvfqk723vsis2cbvy3uaneoo2lo4x6pnmfh55s6avzq
    ONTO m1qnjjianz6jcwldfju6eocxymlwxqabbanugorxr43u4wmhla6xha
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      DROP LINK codeStatus;
  };
};
