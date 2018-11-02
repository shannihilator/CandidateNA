//initliazes array
let people = []

//calls on intial load people function
loadApi(people)

document.querySelector('#unique-values').addEventListener('click', () => {
	countAllUnique()
})

document.querySelector('#find-duplicates').addEventListener('click', () => {
	findDuplicates()
})

