CREATE MIGRATION m1bdwakgtl42ytw473w22zie7x2ty6fgwwa3p455f6einlgpta62qa
    ONTO m15wdlyqxt7mlcpv5m2zdxp7z6qnxgmblyvqnx6tjradwwlnyaj2yq
{
  ALTER TYPE sys_obj::FormFieldEl {
      ALTER PROPERTY items {
          SET TYPE std::json USING (<std::json>.items);
      };
  };
};
