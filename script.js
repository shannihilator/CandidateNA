// initliazes array
let people = []

// calls on intial load people function
loadApi(people)

// event listener for calculating all unique chars in all emails
document.querySelector('#unique-values').addEventListener('click', () => {
	countAllUnique()
})

// event listener for suggesting potential duplicates based on 95% or more char match
document.querySelector('#find-duplicates').addEventListener('click', () => {
	findDuplicates()
})

