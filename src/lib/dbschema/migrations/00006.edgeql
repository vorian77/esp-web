CREATE MIGRATION m1sygnkgnqchtaeeid43a5xdkhuofhmklws73idgx2ywpcrjotz32q
    ONTO m1a5nnegzwbv3uu6mmiryo7m53ci2bdkgwkq53eib4qwknwvvyfptq
{
  ALTER TYPE app_cm::CmCourse {
      DROP PROPERTY isActive;
  };
};
