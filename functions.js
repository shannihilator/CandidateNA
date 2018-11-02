// adds row containing name, email, title, and a button for count unique chars for each item in the array
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
		
		document.querySelector('#people-data').appendChild(row)
	})
}

// fetches the people from SalesLoft API then pushes each one to an array and calls displayPeople to add each item to table
const loadApi = array => {
	fetch('https://api.salesloft.com/v2/people.json', {
	headers: {
    	'Authorization': config.apiKey,
    	'Content-Type': 'application/json'}
	})
 	.then(response => {return response.json()})
 	.then(res => {res.data.forEach(entry => array.push(entry))})
 	.then(() => {displayPeople(array)})
 	.then(() => {
 		document.querySelectorAll('.button').forEach(button => {
			button.addEventListener('click', (e) => {
				countUnique(e)
			})
		})
 	})
 	.catch(error=>console.log(error))

}

// displays frequency count of all unique chars of each email
const countUnique = (e) => {
	document.querySelector('#sorted-values').innerHTML = ''
				
	let headerRow = document.createElement('tr')
	let charCol = document.createElement('th')
	let countCol = document.createElement('th')

	charCol.innerHTML = 'Character'
	countCol.innerHTML = 'Count'

	headerRow.appendChild(charCol)
	headerRow.appendChild(countCol)

	document.querySelector('#sorted-values').appendChild(headerRow)

	id = e.target.parentNode
	email = id.childNodes[1].innerHTML
			
	countedChars = pushToSortedArray(calculateUnique(email))

	for(i=0; i<countedChars.length; i++){
		const row = document.createElement('tr')

		for(n=0; n<countedChars[i].length; n++){
			const col = document.createElement('td')
			col.innerHTML = countedChars[i][n]
			row.appendChild(col)
		}
				
		document.querySelector('#sorted-values').appendChild(row)
	}	
}

// calculates the numnber of unique chars and pushes to javascript object
const calculateUnique = (test) => {
	let count = {}

	for (i=0; i<test.length; i++) {
		let letter = test.charAt(i)
		
		if (count.hasOwnProperty(letter)) {
			count[letter] = count[letter] + 1 
		} else {
			count[letter] = 1
		}

	}

	return count
}

// sorts the key value pairs by frequency and pushes to an array
const pushToSortedArray =  (count) => {
	let finalArray = []

	Object.keys(count).forEach((letter) => {
		finalArray.push([letter, count[letter]])
	})

	finalArray.sort((a,b) => b[1] - a[1])

	return finalArray
}

