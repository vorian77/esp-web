import {
	addOrgs,
	addRoleOrg,
	addStaff,
	addRoleStaff,
	userUserType
} from '$server/dbEdge/init/dbEdgeInitUtilities1'
import {
	addOrg,
	addUser,
	addUserOrg,
	execute,
	review
} from '$server/dbEdge/init/dbEdgeInitUtilities2'

const FILE = 'init_cm_training_data'
const rootObjName = '*ROOTOBJ*'

let reviewQuery = ''

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)

	await addOrgs([
		['Atlantic Impact', 'Atlantic Impact Mobile'],
		['Atlantic Impact - School Site 1', ''],
		['Atlantic Impact - School Site 2', ''],
		['Atlantic Impact - School Site 3', '']
	])
	await addRoleOrg([
		['Atlantic Impact', 'cm_training_role_org_agency'],
		['Atlantic Impact - School Site 1', 'cm_training_role_org_venue'],
		['Atlantic Impact - School Site 2', 'cm_training_role_org_venue'],
		['Atlantic Impact - School Site 3', 'cm_training_role_org_venue']
	])

	await addUser({
		firstName: 'Anise',
		lastName: 'Hayes',
		owner: 'Atlantic Impact',
		password: 'Atlantic99!',
		userName: '2482317505'
	})
	await addUser({
		firstName: 'Matthew',
		lastName: 'Clayton',
		owner: 'Atlantic Impact',
		password: 'Atlantic99!',
		userName: '3136276210'
	})
	await addUser({
		firstName: 'Phyllip',
		lastName: 'Hall',
		owner: 'Atlantic Impact',
		password: 'JakeDog#1',
		userName: '2487985578'
	})

	await addUserOrg({ orgName: 'Atlantic Impact', userName: 'user_sys' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2482317505' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '3136276210' })
	await addUserOrg({ orgName: 'Atlantic Impact', userName: '2487985578' })

	await userUserType([['2482317505', 'ut_cm_training_staff_provider']])
	await userUserType([['3136276210', 'ut_cm_training_staff_provider']])
	await userUserType([['2487985578', 'ut_cm_training_staff_provider']])

	await addStaff([
		['Atlantic Impact', 'Stacy', 'Administrator'],
		['Atlantic Impact', 'Stan', 'Administrator'],
		['Atlantic Impact', 'Anise', 'Hayes'],
		['Atlantic Impact', 'Matthew', 'Clayton'],
		['Atlantic Impact', 'Erica', 'Hicks'],
		['Atlantic Impact', 'Jane', 'Instructor'],
		['Atlantic Impact', 'Joe', 'Instructor']
	])

	await addRoleStaff([
		['Stacy', 'Administrator', 'cm_training_role_staff_admin'],
		['Stan', 'Administrator', 'cm_training_role_staff_admin'],

		['Anise', 'Hayes', 'cm_training_role_staff_agency'],
		['Matthew', 'Clayton', 'cm_training_role_staff_agency'],
		['Erica', 'Hicks', 'cm_training_role_staff_agency'],

		['Jane', 'Instructor', 'cm_training_role_staff_instructor'],
		['Joe', 'Instructor', 'cm_training_role_staff_instructor']
	])

	await dataCourses()
	await dataCohorts()
	await dataStudents()
	await dataServiceFlows()
	await dataClientServiceFlows()
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

reviewQuery = `select app_cm::Client {*, person: {id, firstName, lastName, email}}`

async function dataCourses() {
	await execute(`
    with
    myCreator := (select sys_user::getUser('user_sys'))
    for x in {
      ('Construction', 'Under development', 'Yes', 'Commercial Painting', 3999, 'Training in Commercial Painting will prepare participants for the complexities of painting large-scale business projects such as, factories, residential complexes, and retail developments. Training will focus on drywall, overcoat, and ceiling painting, sealing cracks with wall filler, repairing wood trim, decorative painting, exterior painting, and power washing.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      ('Construction', 'Under development', 'Yes', 'Heavy Equipment (Skills for Life)', 3200, 'This training will prepare students for careers in Heavy Equipment. Program participants will learn how to safely and professionally use forklifts, aerial lifts, and skid steers. During this program students will also learn how to safely operate heavy equipment, how to properly conduct and fill out daily equipment safety checklist, and how to determine equipment load limits. At the conclusion of this program, Participants will receive 128 hours of hand-on training, certifications in OSHA 30, and asbestos abatement.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      ('Construction', 'Under development', 'Yes', 'Residential and Commercial Masonry', 3999, 'This training introduces students to the history, materials, equipment, drawings, and measurements needed to build a career in the fields of residential and commercial masonry. Skills learned will allow students to build walkways, fences, walls, patios, and building structures using concrete blocks, bricks, and structural tiles.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),     
    }
    union (insert app_cm_training::Course {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      codeSector := (select sys_core::getCode('ct_cm_training_course_sector', x.0)),
      codeStatus := (select sys_core::getCode('ct_sys_status', x.1)),
      isActive := x.2,
      name := x.3,
      cost := x.4,
      description := x.5,
      schedule := x.6,
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function dataCohorts() {
	await execute(`
    with
    myCreator := (select sys_user::getUser('user_sys'))
    for x in {
      ('Commercial Painting', 'Cohort 1', 'Under development'), 
      ('Heavy Equipment (Skills for Life)', 'Cohort 2', 'Under development'),   
      ('Heavy Equipment (Skills for Life)', 'Cohort 3', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 4', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 5', 'Under development'),   
      ('Residential and Commercial Masonry', 'Cohort 6', 'Under development'),   
    }
    union (insert app_cm_training::Cohort {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      course := (select app_cm_training::getCMTrainingCourse(x.0)),
      name := x.1,
      codeStatus := (select sys_core::getCode('ct_sys_status', x.2)),
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function dataStudents() {
	await execute(`
    with
    myCreator := (select sys_user::getUser('user_sys'))
    for x in {
      ('AE-195100', 'Jose', 'Prater', 'jp@gmail.com'),
      ('AE-195200', 'Jeron', 'Johnson', 'jj@gmail.com'),
      ('AE-195300', 'Sara', 'Payne', 'sp@gmail.com'),
      ('AE-195400', 'Elonda', 'Cruder', 'ec@gmail.com'),
      ('AE-195500', 'Christopher', 'Calhoun', 'cc@gmail.com'),
      ('AE-195600', 'Regory', 'Elliott', 're@gmail.com'),
      ('AE-195700', 'Farrah', 'May', 'fm@gmail.com'),
      ('AE-195800', 'Gerrell', 'Johnson', 'gj@gmail.com'),
      ('AE-195900', 'Cornelius', 'Williams', 'cw@gmail.com'),
      ('AE-196000', 'Chakiya', 'Long', 'cl@gmail.com'),
      ('AE-196100', 'William', 'Cobb', 'wc@gmail.com'),
      ('AE-196200', 'Italo', 'Rodriguez', 'ir@gmail.com'),
      
    }
    union (insert app_cm::Client {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      agencyId := x.0,
      person := (insert default::Person {
        firstName := x.1,
        lastName := x.2,
        email := x.3  
      }),
      createdBy := myCreator,
      modifiedBy := myCreator
    });
  `)
}

async function dataServiceFlows() {
	await execute(`
      with
      myCreator := (select sys_user::getUser('user_sys'))
      for x in {
        ('sf_cm_training', 'DESC'), 
        ('sf_cm_osha', 'OSHA'),    
        ('sf_cm_youth_build', 'Youth Build'),    
      }
      union (insert app_cm::ServiceFlow {
        owner := (select sys_core::getOrg('System')),
        name := x.0,
        header := x.1,
        createdBy := myCreator,
        modifiedBy := myCreator
      });
    `)
}

async function dataClientServiceFlows() {
	await execute(`
      with
      myCreator := (select sys_user::getUser('user_sys'))
      for x in {
        ('AE-195500', 'sf_cm_training', '2023-11-05', 'Note 1'),
        ('AE-195500', 'sf_cm_osha', '2023-11-15', 'Note 2'),
        ('AE-196100', 'sf_cm_training', '2023-12-01', 'Note 3'),        
      }
      union (insert app_cm::ClientServiceFlow {
        client := (select assert_single((select app_cm::Client filter .agencyId = x.0))),
        serviceFlow := (select assert_single((select app_cm::ServiceFlow filter .name = x.1))),
        codeStatus := (select assert_single((select sys_core::Code filter .codeType.name = 'ct_cm_service_flow_status' and .name = 'Pending'))),
        dateReferral := <cal::local_date>x.2,
        note := x.3,
        createdBy := myCreator,
        modifiedBy := myCreator
      });
    `)
}
