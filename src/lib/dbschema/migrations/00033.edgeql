CREATE MIGRATION m1wks3swugubaimlwwg4ajct45ceuc4n6ch2abcc6thit5o6ja7vuq
    ONTO m1mcwjeypxgz2zzoev5uexjrorxyi3r6nkeo2z3w7e5y3w3bu2vsfa
{
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY imageAltText: std::str;
      CREATE PROPERTY imageWidth: std::str;
  };
};
