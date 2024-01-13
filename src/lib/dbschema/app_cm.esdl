module app_cm {
  type CmClient extending sys_user::Mgmt {
    required owner: sys_core::SysOrg;
    required person: default::SysPerson{
      on source delete delete target if orphan;
    };
    agencyId: str;
  }

  type CmServiceFlow extending sys_core::SysObj {}

  type CmClientServiceFlow extending sys_user::Mgmt {
    required client: app_cm::CmClient;
    required serviceFlow: app_cm::CmServiceFlow;
    required codeStatus: sys_core::SysCode;
    required dateReferral: cal::local_date;
    dateStartEst: cal::local_date;
    dateStart: cal::local_date;
    dateEndEst: cal::local_date;
    dateEnd: cal::local_date;
    note: str;
  }

  type CmCsfData extending sys_user::Mgmt {
    required clientServiceFlow: app_cm::CmClientServiceFlow;
  }

  type CmCsfNote extending app_cm::CmCsfData {
    required date: cal::local_date;
    required codeType: sys_core::SysCode;
    note: str;
  }

  #  training
  type CmCourse extending sys_core::SysObj {
    multi codeMultiCerts: sys_core::SysCode;
    multi codeMultiExams: sys_core::SysCode;
    multi codeMultiItemsIncluded: sys_core::SysCode;
    multi codeMultiItemsNotIncluded: sys_core::SysCode;
    multi codeMultiRqmts: sys_core::SysCode;
    codeSector: sys_core::SysCode;
    codeStatus: sys_core::SysCode;
    codeTypePayment: sys_core::SysCodeType;
    cost: float32;
    description: str;
    isActive: str;
    provider: sys_core::SysOrg;
    schedule: str;
    staffAdmin: sys_user::SysStaff;
    staffAgency: sys_user::SysStaff;
  }
 
  type CmCohort extending sys_core::SysObj {
    capacity: int16;
    codeStatus: sys_core::SysCode;
    required course: app_cm::CmCourse;
    isCohortRequired: str;
    note: str;
    schedule: str;
    staffAdmin: sys_user::SysStaff;
    staffAgency: sys_user::SysStaff;
    staffInstructor: sys_user::SysStaff;
    venue: sys_core::SysOrg;
  }

  type CmCsfCohort extending app_cm::CmCsfData {
    multi codeMultiCerts: sys_core::SysCode;
    required codeStatus: sys_core::SysCode;
    required cohort: app_cm::CmCohort;
    dateEnd: cal::local_date;
    dateReferral: cal::local_date;
    dateStart: cal::local_date;
    note: str;
  }

  type CmCsfCohortAttd extending sys_user::Mgmt {
    required csfCohort: app_cm::CmCsfCohort;
    required date: cal::local_date;
    required duration: float32;
    note: str;
  }  

  type CmCsfCertification extending app_cm::CmCsfData {
    required codeCertification: sys_core::SysCode;
    required course: app_cm::CmCourse;
    dateExpires: cal::local_date;
    required dateIssued: cal::local_date;
    imageCertification: json;
    note: str;
    required staffAgency: sys_user::SysStaff;
  }

  # FUNCTIONS
  function getCMTrainingCourse(name: str) -> optional app_cm::CmCourse
      using (select assert_single((select app_cm::CmCourse filter .name = name)));
}




