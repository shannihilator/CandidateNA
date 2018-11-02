const displayPeople = array => {
	array.forEach(person => {
		let row = document.createElement('tr')
		row.id = person.id

		let name = document.createElement('td')
		name.innerHTML = person.display_name
		row.appendChild(name)
				
		let email = document.createElement('td')
		email.innerHTML = person.email_address
		row.appendChild(email)
		
		let title = document.createElement('td')
		title.innerHTML = person.title
		row.appendChild(title)
		
		let button = document.createElement('button')
		button.innerHTML = 'Click'
		button.classList.add('button')
		row.appendChild(button)
		
		document.querySelector('table').appendChild(row)
	})
}

const loadApi = array => {
	fetch('https://api.salesloft.com/v2/people.json', {
	headers: {
    	'Authorization': config.apiKey,
    	'Content-Type': 'application/json'}
	})
 	.then(response => {return response.json()})
 	.then(res => {res.data.forEach(entry => array.push(entry))})
 	.then(() => {displayPeople(array)})
 	.catch(error=>console.log(error))

}

