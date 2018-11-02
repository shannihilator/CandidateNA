let people = []

fetch('https://api.salesloft.com/v2/people.json', {
	headers: {
    	'Authorization': config.apiKey,
    	'Content-Type': 'application/json'}
	})
 	.then(response => {return response.json()})
 	.then(res => {res.data.forEach(entry => people.push(entry))})
 	.catch(error=>console.log(error))

console.log(people)