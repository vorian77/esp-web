CREATE MIGRATION m1nuptfqcxo4zwcptq5jav6ucznttgad7emxk25gsu4ldtckcd675a
    ONTO m1yxzbzi7h5ok27eticeurgs3k42operblmuleipldybdvhlskbmda
{
  ALTER TYPE sys_core::Code {
      DROP PROPERTY value;
  };
};
