import { execute } from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'initCMDataAI'

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await initCourses()
	await initCohorts()
	await initStudents()
	await initServiceFlows()
	await initClientServiceFlows()
	await initCsfCohort()
	console.log(`${FILE}.end`)
}

async function initCourses() {
	await execute(`
    with
    myCreator := (select sys_user::getRootUser())
    for x in {
      ('Construction', 'Under development', 'Commercial Painting', 3999, 'ct_cm_payment_type_milestone2', 'Training in Commercial Painting will prepare participants for the complexities of painting large-scale business projects such as, factories, residential complexes, and retail developments. Training will focus on drywall, overcoat, and ceiling painting, sealing cracks with wall filler, repairing wood trim, decorative painting, exterior painting, and power washing.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      ('Construction', 'Under development', 'Heavy Equipment (Skills for Life)', 3200, 'ct_cm_payment_type_milestone1', 'This training will prepare students for careers in Heavy Equipment. Program participants will learn how to safely and professionally use forklifts, aerial lifts, and skid steers. During this program students will also learn how to safely operate heavy equipment, how to properly conduct and fill out daily equipment safety checklist, and how to determine equipment load limits. At the conclusion of this program, Participants will receive 128 hours of hand-on training, certifications in OSHA 30, and asbestos abatement.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      ('Construction', 'Under development', 'Residential and Commercial Masonry', 3999, 'ct_cm_payment_type_milestone2', 'This training introduces students to the history, materials, equipment, drawings, and measurements needed to build a career in the fields of residential and commercial masonry. Skills learned will allow students to build walkways, fences, walls, patios, and building structures using concrete blocks, bricks, and structural tiles.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),     
    }
    union (insert app_cm::CmCourse {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      codeSector := (select sys_core::getCode('ct_cm_course_sector', x.0)),
      codeStatus := (select sys_core::getCode('ct_sys_status', x.1)),
      name := x.2,
      cost := x.3,
      codeTypePayment := (select sys_core::getCodeType(x.4)),
      description := x.5,
      schedule := x.6,
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function initCohorts() {
	await execute(`
    with
    myCreator := (select sys_user::getRootUser())
    for x in {
      ('Commercial Painting', 'Cohort 1', 'Under development'), 
      ('Heavy Equipment (Skills for Life)', 'Cohort 2', 'Under development'),   
      ('Heavy Equipment (Skills for Life)', 'Cohort 3', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 4', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 5', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 6', 'Under development'),   
    }
    union (insert app_cm::CmCohort {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      course := (select app_cm::getCMTrainingCourse(x.0)),
      name := x.1,
      codeStatus := (select sys_core::getCode('ct_sys_status', x.2)),
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function initStudents() {
	await execute(`
    with
    myCreator := (select sys_user::getRootUser())
    for x in {
      ('AE-195100', 'Jose', 'Prater', 'jp@gmail.com', <cal::local_date>'2004-01-10'),
      ('AE-195200', 'Jeron', 'Johnson', 'jj@gmail.com', <cal::local_date>'2006-02-02'),
      ('AE-195300', 'Sara', 'Payne', 'sp@gmail.com', <cal::local_date>'2003-03-03'),
      ('AE-195400', 'Elonda', 'Cruder', 'ec@gmail.com', <cal::local_date>'2002-02-02'),
      ('AE-195500', 'Christopher', 'Calhoun', 'cc@gmail.com', <cal::local_date>'2001-01-01'),
      ('AE-195600', 'Regory', 'Elliott', 're@gmail.com', <cal::local_date>'2005-05-05'),
      ('AE-195700', 'Farrah', 'May', 'fm@gmail.com', <cal::local_date>'2004-09-09'),
      ('AE-195800', 'Gerrell', 'Johnson', 'gj@gmail.com', <cal::local_date>'2001-01-20'),
      ('AE-195900', 'Cornelius', 'Williams', 'cw@gmail.com', <cal::local_date>'2023-05-15'),
      ('AE-196000', 'Chakiya', 'Long', 'cl@gmail.com', <cal::local_date>'2024-04-14'),
      ('AE-196100', 'William', 'Cobb', 'wc@gmail.com', <cal::local_date>'2008-08-18'),
      ('AE-196200', 'Italo', 'Rodriguez', 'ir@gmail.com', <cal::local_date>'2005-05-15'),
      
    }
    union (insert app_cm::CmClient {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      agencyId := x.0,
      person := (insert default::SysPerson {
        firstName := x.1,
        lastName := x.2,
        email := x.3,
        birthDate := x.4
      }),
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function initServiceFlows() {
	await execute(`
      with
      myCreator := (select sys_user::getRootUser())
      for x in {
        ('sf_cm_det_desc', 'DESC'), 
        ('sf_cm_exposure', 'Exposure'), 
        ('sf_cm_dol_osha', 'OSHA'),    
        ('sf_cm_ai_our_world', 'Our World'),  
        ('sf_cm_ai_youth_build', 'Youth Build'),    
      }
      union (insert app_cm::CmServiceFlow {
        owner := (select sys_core::getOrg('System')),
        name := x.0,
        header := x.1,
        createdBy := myCreator,
        modifiedBy := myCreator
      });
    `)
}

async function initClientServiceFlows() {
	await execute(`
      with
      myCreator := (select sys_user::getRootUser())
      for x in {
        ('AE-195500', 'sf_cm_det_desc', '2023-11-05', 'Note 1'),
        ('AE-195500', 'sf_cm_dol_osha', '2023-11-15', 'Note 2'),
        ('AE-196100', 'sf_cm_det_desc', '2023-12-01', 'Note 3'),  
        ('AE-196100', 'sf_cm_dol_osha', '2023-12-01', 'Note 4'),      
      }
      union (insert app_cm::CmClientServiceFlow {
        client := (select assert_single((select app_cm::CmClient filter .agencyId = x.0))),
        serviceFlow := (select assert_single((select app_cm::CmServiceFlow filter .name = x.1))),
        codeStatus := (select assert_single((select sys_core::SysCode filter .codeType.name = 'ct_cm_service_flow_status' and .name = 'Pending'))),
        dateReferral := <cal::local_date>x.2,
        note := x.3,
        createdBy := myCreator,
        modifiedBy := myCreator
      });
    `)
}

async function initCsfCohort() {
	await execute(`
  with
  myCreator := (select sys_user::getRootUser())
  for x in {
    ('AE-195500', 'sf_cm_det_desc', '2023-11-05', 'Commercial Painting', 'Cohort 1', 'Completed', '2023-11-05'), 
    ('AE-196100', 'sf_cm_dol_osha', '2023-12-01', 'Residential and Commercial Masonry', 'Cohort 6', 'Completed', '2023-12-01'), 
  }
  union (insert app_cm::CmCsfCohort {
    csf := (select assert_single((select app_cm::CmClientServiceFlow filter
      .client = (select assert_single((select app_cm::CmClient filter .agencyId = x.0))) and
      .serviceFlow = (select assert_single((select app_cm::CmServiceFlow filter .name = x.1))) and
      .dateReferral = <cal::local_date>x.2))), 
    cohort := (select assert_single((select app_cm::CmCohort filter
      .course = (select app_cm::getCMTrainingCourse(x.3)) and
      .name = x.4))),
    codeStatus := (select assert_single((select sys_core::SysCode filter .codeType.name = "ct_cm_service_flow_status" and .name = x.5))),
    dateReferral := <cal::local_date>x.6,
    createdBy := myCreator,
    modifiedBy := myCreator                         
  });
`)
}
