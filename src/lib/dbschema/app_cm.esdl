module app_cm {
  type Client extending sys_user::Mgmt {
    required owner: sys_core::Org;
    required person: default::Person{
      on source delete delete target if orphan;
    };
    agencyId: str;
  }

  type ServiceFlow extending sys_core::Obj {}

  type ClientServiceFlow extending sys_user::Mgmt {
    required client: Client;
    required serviceFlow: ServiceFlow;
    required codeStatus: sys_core::Code;
    required dateReferral: cal::local_date;
    dateStartEst: cal::local_date;
    dateStart: cal::local_date;
    dateEndEst: cal::local_date;
    dateEnd: cal::local_date;
    note: str;
  }

  type CsfData extending sys_user::Mgmt {
    required clientServiceFlow: ClientServiceFlow;
  }

  type CsfNote extending app_cm::CsfData {
    required date: cal::local_date;
    required codeType: sys_core::Code;
    note: str;
  }
}

module app_cm_training {
  type Course extending sys_core::Obj {
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
    isActive: str;
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

  type CsfCohort extending app_cm::CsfData {
    required cohort: app_cm_training::Cohort;
    required codeStatus: sys_core::Code;
    dateReferral: cal::local_date;
    dateStart: cal::local_date;
    dateEnd: cal::local_date;
    multi codeOutcomes: sys_core::Code;
    note: str;
  }

  type CsfCohortAttd extending app_cm::CsfData {
    required csfCohort: app_cm_training::CsfCohort;
    required date: cal::local_date;
    required duration: decimal;
    note: str;
  }  

  # FUNCTIONS
  function getCMTrainingCourse(name: str) -> optional Course
      using (select assert_single((select Course filter .name = name)));
}




