// adds row containing name, email, title, and a button for count unique chars for each item in the array
const displayPeople = array => {
	array.forEach(person => {
		let row = document.createElement('tr')
		row.id = person.id

		let name = document.createElement('td')
		name.innerHTML = person.display_name
		row.appendChild(name)
				
		let email = document.createElement('td')
		email.classList.add('email')
		email.innerHTML = person.email_address
		row.appendChild(email)
		
		let title = document.createElement('td')
		title.innerHTML = person.title
		row.appendChild(title)
		
		let button = document.createElement('button')
		button.innerHTML = 'Click'
		button.classList.add('button')
		button.addEventListener('click', (e) => {
				countUnique(e)
		})
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
const pushToSortedArray = (count) => {
	let finalArray = []

	Object.keys(count).forEach((letter) => {
		finalArray.push([letter, count[letter]])
	})

	finalArray.sort((a,b) => b[1] - a[1])

	return finalArray
}

// searches through emails and finds potential duplicates based on % chars match
const findDuplicates = () => {
	let emails = []
	let duplicates = []
	
	document.querySelectorAll('.email').forEach(email => {
		emails.push(email.innerHTML)
	})

	for (let i=0; i<emails.length; i++){
		for (let n=0; n<emails.length; n++){	
			if (i!==n){
				if(percentageSimilar(emails[i], emails[n])>95){
					duplicates.push({
						email1: emails[i],
						email2: emails[n],
						percentage: percentageSimilar(emails[i], emails[n])
					})
				}	
			}
		}
	}

	const duplicates3 = filterRepeats(duplicates)

	displayDuplicates(duplicates3)
}


// calculate percentage of chars 2 strings share
const percentageSimilar = (str1, str2) => {
	let count = 0

	if (str1.length > str2.length){
		for (let i=0; i<str2.length; i++) {
			if (str1.includes(str2.charAt(i))) {
				count++
			}
		}
		return count/str2.length*100
	}
	else {
		for (let i=0; i<str1.length; i++) {
			if (str2.includes(str1.charAt(i))) {
				count++
			}
		}

		return count/str1.length*100
	}
}

const filterRepeats = (array) => {
	const duplicates2 = array.map((o) => {
	    if (o.email1 <= o.email2) {
	        o.s1 = o.email1;
	        o.s2 = o.email2;
	    } else {
	        o.s1 = o.email2;
	        o.s2 = o.email1;
	    }
	    return o;
	});

	const duplicates3 = duplicates2.filter((o, i) => i === duplicates2.findIndex(i => i.s1 === o.s1 && i.s2 === o.s2));

	return duplicates3
}



// display potential duplicates 
const displayDuplicates = (duplicates) => {
	duplicates.forEach((duplicate) => {
		let p = document.createElement('p')
		p.innerHTML = `${duplicate.email1} and ${duplicate.email2} have ${duplicate.percentage}% of the same characters`

		document.body.appendChild(p)
	})
}
