CREATE MIGRATION m15wdlyqxt7mlcpv5m2zdxp7z6qnxgmblyvqnx6tjradwwlnyaj2yq
    ONTO m1mz6gaiehwt2mpexgf3xbmjo3eu77sno3qizzghu3sjkieinpkega
{
  ALTER TYPE sys_obj::FormFieldEl {
      DROP LINK items;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY items: array<std::json>;
  };
  DROP TYPE sys_obj::FormFieldItemsElement;
};
