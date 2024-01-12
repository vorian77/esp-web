CREATE MIGRATION m1xpq7hd2656fzhcsqmp3x6xdlacvmoscf4gd2oarotzqm5vurenua
    ONTO m1htl7qkh7i3moqv27r7kn2ht3ygvdpl7bzmor4wzlemar62dsldyq
{
  ALTER TYPE app_cm::CsfCertification {
      ALTER LINK codeCert {
          RENAME TO codeCertification;
      };
  };
};
