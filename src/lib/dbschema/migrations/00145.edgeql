CREATE MIGRATION m1eh7nbtm6pv6r7mtwbhxcxa2m3m3vc6oxgrfv7nakqtpevngxh22a
    ONTO m13iyfipfs5onxs75wm7r4z6u4mhxa72mrthzkj42htb33qjyqed3q
{
  ALTER TYPE app_cm_training::Section {
      ALTER PROPERTY eventId {
          RENAME TO sectionID;
      };
  };
};
