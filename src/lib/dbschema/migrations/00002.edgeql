CREATE MIGRATION m1niox3x74eajfakusew6hxaea3fyigdcm7lx3o4qhyphml4r5nv5a
    ONTO m145jjbu7ux6k34e5pejnyqzxmn5xaksqdxuixd2ttw4solwfaqgwa
{
  CREATE FUNCTION sys_obj::getDataObj(dataObjName: std::str) -> OPTIONAL sys_obj::DataObj USING (SELECT
      sys_obj::DataObj
  FILTER
      (.name = dataObjName)
  );
};
