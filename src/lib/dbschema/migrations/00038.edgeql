CREATE MIGRATION m1sh4nqznudh52ktqg7tcfu6sz5zbt3xgfzbegst3teeoh7gf5vpca
    ONTO m1fadh6zknt4lukrw4rxspj4lugwr346oicyboedva5t2kq4wfdrqa
{
  ALTER TYPE sys_db::Column {
      DROP PROPERTY dynamicLabelKey;
      DROP PROPERTY staticLabel;
  };
  ALTER TYPE sys_obj::FormFieldEl {
      CREATE PROPERTY hdrLabelDynamicKey: std::str;
      CREATE PROPERTY hdrLabelDynamicSource: std::str;
      CREATE PROPERTY hdrLabelStatic: std::str;
  };
};
