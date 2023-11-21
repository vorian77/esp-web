import { addOrg, addUser, execute, review } from '$server/dbEdge/types.edgeDB.server'

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

	await addOrg({
		name: 'Atlantic Impact',
		creator: 'user_sys'
	})

	await dataCourses()
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
      (true, 'Commercial Painting', 3999, 'Training in Commercial Painting will prepare participants for the complexities of painting large-scale business projects such as, factories, residential complexes, and retail developments. Training will focus on drywall, overcoat, and ceiling painting, sealing cracks with wall filler, repairing wood trim, decorative painting, exterior painting, and power washing.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      (true, 'Heavy Equipment (Skills for Life)', 3200, 'This training will prepare students for careers in Heavy Equipment. Program participants will learn how to safely and professionally use forklifts, aerial lifts, and skid steers. During this program students will also learn how to safely operate heavy equipment, how to properly conduct and fill out daily equipment safety checklist, and how to determine equipment load limits. At the conclusion of this program, Participants will receive 128 hours of hand-on training, certifications in OSHA 30, and asbestos abatement.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),
      (true, 'Residential and Commercial Masonry', 3999, 'This training introduces students to the history, materials, equipment, drawings, and measurements needed to build a career in the fields of residential and commercial masonry. Skills learned will allow students to build walkways, fences, walls, patios, and building structures using concrete blocks, bricks, and structural tiles.', 'Tuesday, Wednesday, Thursday, Friday 4:00 PM – 9:30 PM; Saturday 9AM – 5PM; 8 Weeks', ''),     
    }
    union (insert app_cm_training::Course {
      owner := (select sys_core::getOrg('Atlantic Impact')),
      isActive := x.0,
      name := x.1,
      cost := x.2,
      description := x.3,
      schedule := x.4,
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
