module app_cm_training {
   type Student extending default::Person, default::Mgmt {
    required agencyId: str;
    email: str;
  }
}