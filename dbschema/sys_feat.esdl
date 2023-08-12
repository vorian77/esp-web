module sys_feat {
  type sys_ent {
    required property name -> str {
      constraint exclusive;
    };
  }

}