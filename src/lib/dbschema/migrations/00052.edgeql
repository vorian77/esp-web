CREATE MIGRATION m1vwafvl7yimb7kefxio3ce43np7rrovff64d3uohdf2huvfzg7wvq
    ONTO m1ofswtyuvsmvlkxejftn2g4qa5dyknu5qqqpfgo6r4jcwpcnahdhq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY queryActions: array<std::json>;
  };
};
