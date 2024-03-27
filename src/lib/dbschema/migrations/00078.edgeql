CREATE MIGRATION m1fkk6ceme5hhftauaqlbegxxxsluwfp7dqoldenroh2lzwpomkmga
    ONTO m1iwgid2l73nxck3xpryvq4yq6o2cifwivcw6vzc3dxmlvgtyyysza
{
  ALTER TYPE app_cm::CmEmployer {
      ALTER LINK contact {
          ON SOURCE DELETE DELETE TARGET IF ORPHAN;
      };
  };
};
