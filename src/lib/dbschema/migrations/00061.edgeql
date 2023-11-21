CREATE MIGRATION m1er4l47sify2653ly5m3iv6ztdvkmz5zpkgnxd5jqyuyh2gqrjqeq
    ONTO m1zmbiioik3e2wqaqsstc7duofzlh76ziyg3e4zif4rhdjbitoz7ua
{
  DROP FUNCTION sys_obj::getFormFieldItemsList(name: std::str);
  ALTER TYPE sys_obj::FormFieldEl {
      DROP LINK items;
      DROP LINK itemsList;
  };
  DROP TYPE sys_obj::FormFieldItemsElement;
  DROP TYPE sys_obj::FormFieldItemsList;
};
