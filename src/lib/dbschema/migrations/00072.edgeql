CREATE MIGRATION m1wqqfnpnt6olv27npy76h3qn76cxit2xjbo7clczlknpuqi5uxbsa
    ONTO m1tg4meoboqbrmht6bh7pya6cesfhyz3syecfbwsixqovmrtoerkiq
{
  ALTER FUNCTION sys_core::getOverlayNodeItems(name: std::str) {
      RENAME TO sys_core::getOverlayNodeFieldItems;
  };
};
