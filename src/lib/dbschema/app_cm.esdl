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
    isActive: str;
    multi codeMultiCerts: sys_core::Code;
    multi codeMultiExams: sys_core::Code;
    multi codeMultiItemsIncluded: sys_core::Code;
    multi codeMultiItemsNotIncluded: sys_core::Code;
    multi codeMultiRqmts: sys_core::Code;
    codeSector: sys_core::Code;
    codeStatus: sys_core::Code;
    codeTypePayment: sys_core::CodeType;
    cost: float32;
    description: str;
    provider: sys_core::Org;
    schedule: str;
    staffAdmin: sys_user::Staff;
    staffAgency: sys_user::Staff;
  }
 
  type Cohort extending sys_core::Obj {
    capacity: int16;
    codeStatus: sys_core::Code;
    required course: app_cm_training::Course;
    isCohortRequired: str;
    note: str;
    schedule: str;
    staffAdmin: sys_user::Staff;
    staffAgency: sys_user::Staff;
    staffInstructor: sys_user::Staff;
    venue: sys_core::Org;
  }

  # FUNCTIONS
  function getCMTrainingCourse(name: str) -> optional Course
      using (select assert_single((select Course filter .name = name)));
}




