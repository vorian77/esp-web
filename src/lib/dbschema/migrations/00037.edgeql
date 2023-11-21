CREATE MIGRATION m1fadh6zknt4lukrw4rxspj4lugwr346oicyboedva5t2kq4wfdrqa
    ONTO m1oczmds2lobszogohgfsj6x4q7fdss3oo53sapypxz4llgcley4rq
{
  ALTER TYPE sys_db::Column {
      CREATE PROPERTY classValue: std::str;
      CREATE PROPERTY dynamicLabelKey: std::str;
      CREATE PROPERTY imgAltText: std::str;
      CREATE PROPERTY imgBtnLabelSelect: std::str;
      CREATE PROPERTY imgBtnLabelUpload: std::str;
      CREATE PROPERTY imgKey: std::str;
      CREATE PROPERTY staticLabel: std::str;
  };
};
