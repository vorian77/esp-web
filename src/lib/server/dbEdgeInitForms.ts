import { createClient } from 'edgedb'
import e from '../dbschema/edgeql-js'
import { EDGEDB_INSTANCE, EDGEDB_SECRET_KEY } from '$env/static/private'

const client = createClient({
	instanceName: EDGEDB_INSTANCE,
	secretKey: EDGEDB_SECRET_KEY
})

const CREATOR = e.select(e.sys_user.getUser('user_sys'))
let q = ''
let result

export async function initForms() {
	console.log()
	console.log('edgeDB-initForms.1')
	await reset()
	await form1()
	// await data()
	console.log('edgeDB-initForms.review:', review)
}

const review = await client.query(`select sys_app::Node {*} filter exists .obj `)

async function reset() {
	await client.execute(`
    delete sys_app::Node filter exists .obj;
    delete sys_form::Form;
		delete sys_form::FormField;
    delete sys_form::FormAction; 
		delete sys_form::FormActionItem;
`)
}

async function form1() {
	/* node_training_provider_student_list */
	q = `
  with 
  myCreator := (select sys_user::getUser('user_sys'))
  insert sys_form::Form {
    owner := (select sys_core::getEnt('app_training')),
    name := "form_training_provider_student_list",
    header := "Students",
    subHeader := "All students enrolled in any courses.",
    fields := {
      (insert sys_form::FormField { name := "id", label := "Record ID", codeAccess := (select sys_core::getCode('ct_sys_form_field_access', 'hidden'))}),
      (insert sys_form::FormField { name := "agencyId", label := "Agency ID", codeAccess := (select sys_core::getCode('ct_sys_form_field_access', 'readOnly'))}),
      (insert sys_form::FormField { name := "firstName", label := "First Name", codeAccess := (select sys_core::getCode('ct_sys_form_field_access', 'readOnly'))}),
      (insert sys_form::FormField { name := "lastName", label := "Last Name", codeAccess := (select sys_core::getCode('ct_sys_form_field_access', 'readOnly'))}),
      (insert sys_form::FormField { name := "email", label := "Email", codeAccess := (select sys_core::getCode('ct_sys_form_field_access', 'readOnly'))})
    },
    actions := (
      (insert sys_form::FormAction {
        codeType := (select sys_core::getCode('ct_sys_form_action_type', 'select')),
        query := 'SELECT cm_training::Student { id, agencyId, firstName, lastName, email }',
        }
      )
    ),
    createdBy := myCreator,
    modifiedBy := myCreator
  };
  
  with 
  myCreator := (select sys_user::getUser('user_sys'))
  insert sys_app::Node {
    owner := (select sys_core::getEnt('app_training')),
    parent := (select sys_app::getNode('app_training', 'pgm_training_staff_provider')),
    codeType := (select sys_core::getCode('ct_sys_node_type', 'form')),
    name := "node_training_provider_student_list",
    header := "Students",
    order := 10,
    codeIcon := (select sys_core::getCode('ct_sys_icon', 'application')),
    page := '/apps',
    codeComponent := (select sys_core::getCode('ct_sys_node_component', 'form-list')),
    obj := (select sys_app::getNodeObj('form_training_provider_student_list')),
    createdBy := myCreator,
    modifiedBy := myCreator
  };
`
	await client.execute(q)
}

async function data() {
	await dataStudents()
}

async function dataStudents() {
	await client.execute(`
delete cm_training::Student;
with
myCreator := (select sys_user::getUser('user_sys'))
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
union (insert cm_training::Student {
  agencyId := x.0,
  firstName := x.1,
  lastName := x.2,
  email := x.3,
  createdBy := myCreator,
  modifiedBy := myCreator
});
`)
}
