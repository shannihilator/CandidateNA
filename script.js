//initliazes array
let people = []

//calls on intial load people function
loadApi(people)

document.querySelector('#find-duplicates').addEventListener('click', () => {
	findDuplicates()
})

