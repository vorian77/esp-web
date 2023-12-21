CREATE MIGRATION m1tc6twsrcikudhlscxqlos3feiha5f2ivog7pfdahxamxgasp4eza
    ONTO m1jalrajjljjbo5saa4f4zggjlqrqb6ul4vicb67daa7hkpgsz2adq
{
  ALTER TYPE sys_obj::FormFieldEl {
      DROP PROPERTY nameAlt;
  };
};
