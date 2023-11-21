CREATE MIGRATION m1zgc37thnapdo2pocppdajvmbdaeohko24gbmuor4etqaikqyxdka
    ONTO m1wks3swugubaimlwwg4ajct45ceuc4n6ch2abcc6thit5o6ja7vuq
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY buttonLabel: std::str;
  };
};
