export async function dbRecGet(targetTable, id) {
	const table = db.find((table) => (table.name = targetTable))['data']
	return table.find((rec) => rec.id == id)['data']
}

const db = [
	{
		name: 'forms',
		data: [
			{
				id: '363255616174555209',
				data: {
					id: '1',
					name: 'Auth-Signup',
					label: 'Auth Signup Label',
					description: 'Auth-Signup.',
					submitButtonLabel: 'Sign up',
					fields: [
						{
							element: 'input',
							type: 'text',
							name: 'nameFirst',
							label: 'First Name',
							placeHolder: 'Enter first name...',
							minLength: 2,
							maxLength: 7,
							value: 'Phyllip'
						},
						{
							element: 'input',
							type: 'text',
							name: 'nameLast',
							label: 'Last Name',
							placeHolder: 'Enter last name...',
							minLength: 2,
							value: 'Hall'
						},
						{
							element: 'input',
							type: 'tel',
							name: 'phoneMobile',
							label: 'Mobile Phone Number',
							placeHolder: 'Enter mobile phone number...',
							value: '2487985578'
						},
						{
							element: 'input',
							type: 'password',
							name: 'password',
							label: 'Password',
							placeHolder: 'Enter password...',
							pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$',
							patternMsg:
								'Your password must be at least 8 characters long, and must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, and at least 1 special character (@$!%*#?&).',
							value: 'JakeDog#1'
						},
						{
							element: 'input',
							type: 'checkbox',
							name: 'favoriteIceCreams',
							label: 'Favorite Ice Cream(s)',
							items: [
								{
									id: 1,
									label: 'Vanila Bean'
								},
								{
									id: 2,
									label: 'Chocolate'
								},
								{
									id: 3,
									label: 'Mint Chip'
								}
							]
						}
					]
				}
			},
			{
				id: '364001027435790416',
				data: {
					id: '2',
					name: 'Auth-Login',
					label: 'Auth Login Label',
					description: 'Auth-Login.',
					submitButtonLabel: 'Log in',
					fields: [
						{
							element: 'input',
							type: 'tel',
							name: 'phoneMobile',
							label: 'Mobile Phone Number',
							placeHolder: 'Enter mobile phone number...'
						},
						{
							element: 'input',
							type: 'password',
							name: 'password',
							label: 'Password',
							placeHolder: 'Enter password...',
							pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$',
							patternMsg:
								'Your password must be at least 8 characters long, and must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, and at least 1 special character (@$!%*#?&).'
						}
					]
				}
			},
			{
				id: '364158513654530125',
				data: {
					id: '1',
					name: 'Profile',
					label: "User's Profile",
					description: 'User Profile',
					submitButtonLabel: 'Save',
					fields: [
						{
							element: 'input',
							type: 'date',
							name: 'birthdate',
							label: 'Birthdate',
							access: 'required'
						},
						{
							element: 'input',
							type: 'number',
							name: 'age',
							label: 'Age',
							minValue: 0,
							maxValue: 10
						},
						{
							element: 'input',
							type: 'password',
							name: 'ssn',
							label: 'Social Security Number (skip if unknown)',
							access: 'optional',
							pattern: '^\\d{9}$',
							patternMsg: 'A social secruity number must be exactly 9 digits.'
						},
						{
							element: 'input',
							type: 'password',
							name: 'ssn-verify',
							label: 'Reenter Social Security Number To Verify',
							access: 'optional',
							pattern: '^\\d{9}$',
							patternMsg: 'A social secruity number must be exactly 9 digits.',
							matchColumn: 'ssn'
						},
						{
							element: 'select',
							name: 'gender',
							label: 'Gender',

							items: [
								{
									id: 1,
									label: 'Female'
								},
								{
									id: 2,
									label: 'Male'
								},
								{
									id: 3,
									label: 'Non-Binary/Thrid Gender'
								},
								{
									id: 4,
									label: 'Prefer Not To Say'
								}
							]
						},
						{
							element: 'select',
							name: 'race',
							label: 'Race',
							items: [
								{
									id: 1,
									label: 'American Indian-Alaskan Native'
								},
								{
									id: 2,
									label: 'Black-African American'
								},
								{
									id: 3,
									label: 'Non-Binary/Thrid Gender'
								},
								{
									id: 4,
									label: 'Hawaiian-Other Pacific Islander'
								},
								{
									id: 5,
									label: 'White'
								},
								{
									id: 6,
									label: 'Other'
								}
							]
						},
						{
							element: 'select',
							name: 'ethnicity',
							label: 'Ethnicity',
							items: [
								{
									id: 1,
									label: 'Hispanic-Latino'
								},
								{
									id: 2,
									label: 'Not Hispanic-Latino'
								},
								{
									id: 3,
									label: 'Prefer Not To Say'
								}
							]
						},
						{
							element: 'select',
							name: 'disability-status',
							label: 'Disability Status',
							items: [
								{
									id: 1,
									label: 'Disability (impediment)'
								},
								{
									id: 2,
									label: 'Disability (no impediment)'
								},
								{
									id: 3,
									label: 'Without Disability'
								},
								{
									id: 4,
									label: 'Prefer Not To Say'
								}
							]
						},
						{
							element: 'input',
							type: 'radio',
							name: 'favoriteRapper',
							legend: 'Favorite Rapper',
							value: 3,
							items: [
								{
									id: 1,
									label: 'Biggie'
								},
								{
									id: 2,
									label: 'Emenim'
								},
								{
									id: 3,
									label: 'Lil Wayne'
								}
							]
						},
						{
							element: 'input',
							type: 'checkbox',
							name: 'favoriteIceCreams',
							label: 'Favorite Ice Cream(s)',
							items: [
								{
									id: 1,
									label: 'Vanila Bean'
								},
								{
									id: 2,
									label: 'Chocolate'
								},
								{
									id: 3,
									label: 'Mint Chip'
								}
							]
						}
					]
				}
			}
		]
	}
]
