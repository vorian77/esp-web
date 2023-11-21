CREATE MIGRATION m1mc3bwjnv74tzr7r3sio4wxycf45qqvefgwsaktftc7fc7z2yp4aa
    ONTO m1sh4nqznudh52ktqg7tcfu6sz5zbt3xgfzbegst3teeoh7gf5vpca
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY imgAltText;
      DROP PROPERTY imgBtnLabelSelect;
      DROP PROPERTY imgBtnLabelUpload;
  };
};
