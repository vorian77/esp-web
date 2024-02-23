CREATE MIGRATION m1ria43d64zr6imqgrspzucyyus2sqr72v7uogmgy2oc4p6jevropq
    ONTO m17lgr2i66srzjbxhyulh5kr7wjehicqnyculi3pbvbpj6zvwdiiva
{
  DROP FUNCTION sys_core::getOverlayNodeFieldItems(name: std::str);
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK overlayNodeFieldItems;
  };
  DROP TYPE sys_core::SysOverlayNodeFieldItems;
};
