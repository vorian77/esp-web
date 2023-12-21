CREATE MIGRATION m13ioumroo2uirukrf43njqm4gazcuuglrxvwkyl6it57lcbyjqwqq
    ONTO m12vfb4gm7to7yg4oftth67eldrkbrmkrnn554dlejt5mqmvapd5sq
{
  ALTER TYPE sys_obj::DataObj {
      ALTER LINK codeType {
          RENAME TO codeRenderType;
      };
  };
};
