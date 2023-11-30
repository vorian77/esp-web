import { addOrg, addUser, execute, review } from '$server/dbEdge/types.edgeDB.server'
import {
	addOrgs,
	addRoleOrg,
	addStaff,
	addRoleStaff,
	setOrgUserType
} from '$server/dbEdge/init/dbEdgeInitUtilities'

const FILE = 'init_cm_training_data'
const rootObjName = '*ROOTOBJ*'

let reviewQuery = ''

export default async function init() {
	console.log()
	console.log(`${FILE}.start...`)
	await reset()

	await addUser({
		firstName: 'Atlantic',
		lastName: 'Impact',
		userName: 'user_ai',
		password: '!alfjasf*!@#$$*&'
	})

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

	await setOrgUserType([['Atlantic Impact', 'ut_cm_training_staff_provider']])

	await addStaff([
		['Stacy', 'Administrator'],
		['Stan', 'Administrator'],
		['Anise', 'Hayes'],
		['Matthew', 'Clayton'],
		['Erica', 'Hicks'],
		['Jane', 'Instructor'],
		['Joe', 'Instructor']
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
	// await review(FILE, reviewQuery)
	console.log(`${FILE}.end`)
}

reviewQuery = `select app_cm::Student {*, person: {id, firstName, lastName, email}}`

async function reset() {
	await execute(`
  delete app_cm::Student;
  delete sys_user::User filter .userName ='user_ai'

`)
}

async function dataCourses() {
	await execute(`
    with
    myCreator := (select sys_user::getUser('user_ai'))
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
    myCreator := (select sys_user::getUser('user_ai'))
    for x in {
      ('Commercial Painting', 'Cohort 1', 'Under development'), 
      ('Commercial Painting', 'Cohort 2', 'Under development'),   
      ('Heavy Equipment (Skills for Life)', 'Cohort 1', 'Under development'),   
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
    myCreator := (select sys_user::getUser('user_ai'))
    for x in {
      ('AE-195500', 'Jose', 'Prater', 'jp@gmail.com'),
      ('AE-196800', 'Jeron', 'Johnson', 'jj@gmail.com'),
      ('AE-197100', 'Sara', 'Payne', 'sp@gmail.com'),
      ('AE-197300', 'Elonda', 'Cruder', 'ec@gmail.com'),
      ('AE-197400', 'Christopher', 'Calhoun', 'cc@gmail.com'),
      ('AE-197500', 'Regory', 'Elliott', 're@gmail.com'),
      ('AE-197800', 'Farrah', 'May', 'fm@gmail.com'),
      ('AE-197900', 'Gerrell', 'Johnson', 'gj@gmail.com'),
      ('AE-197900', 'Cornelius', 'Williams', 'cw@gmail.com'),
      ('AE-197000', 'Chakiya', 'Long', 'cl@gmail.com'),
      ('AE-197700', 'William', 'Cobb', 'wc@gmail.com'),
      ('AE-197700', 'Italo', 'Rodriguez', 'ir@gmail.com'),
      
    }
    union (insert app_cm::Student {
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
