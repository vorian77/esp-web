CREATE MIGRATION m1k3nhcynkbkyk4c2cus6bmorns7c5fcdswu2oybi73ob5ss535u7q
    ONTO m1vwafvl7yimb7kefxio3ce43np7rrovff64d3uohdf2huvfzg7wvq
{
  ALTER TYPE sys_core::SysNodeObj {
      DROP PROPERTY queryActions;
  };
};
