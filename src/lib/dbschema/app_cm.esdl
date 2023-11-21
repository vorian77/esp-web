module app_cm {
  type Student extending sys_user::Mgmt {
    required owner: sys_core::Org;
    required person: default::Person{
      on source delete delete target if orphan;
    };
    required agencyId: str;
  }
}

module app_cm_training {
  type Course extending sys_core::Obj {
    isActive: bool;
    multi codeMultiCerts: sys_core::Code;
    multi codeMultiExams: sys_core::Code;
    multi codeMultiItemsIncluded: sys_core::Code;
    multi codeMultiItemsNotIncluded: sys_core::Code;
    multi codeMultiRqmts: sys_core::Code;
    codeSector: sys_core::Code;
    codeTypePayment: sys_core::CodeType;
    cost: float32;
    description: str;
    provider: sys_core::Org;
    schedule: str;
    staffAdmin: sys_user::Staff;
    staffProvider: sys_user::Staff;
  }
 
  type Section extending sys_core::Obj {
    required codeStatus: sys_core::Code;
    required course: app_cm_training::Course;
    dateEnd: cal::local_date;
    required dateStart: cal::local_date;
    note: str;
    userInstructor: sys_user::User;
  }
}

