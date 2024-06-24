/* UserInfo element render */
const weekDays = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
]
function update() {
	const today = new Date()
	return weekDays[today.getDay()]
}

function getUserInfoTemplate(dayString) {
	return `
	<p class="user-info">
					What's up, USER.INFO 👋 <br />
					What a nice <strong>${dayString}</strong> to play something ;)
				</p>
		`
}

document.addEventListener('DOMContentLoaded', function () {
	const userInfo = document.getElementById('userInfo')
	const userInfoHTML = document.createElement('div')
	userInfoHTML.innerHTML = getUserInfoTemplate(update())
	userInfo.appendChild(userInfoHTML)
})

/* Adjacent of new table elements*/

const inputGameTitle = document.getElementById('gameToAdd')
const inputGenres = document.getElementById('genresToAdd')
const inputPrice = document.getElementById('priceToAdd')
const inputService = document.getElementById('serviceToAdd')
const inputPublisher = document.getElementById('publisherToAdd')
const addGameBtn = document.getElementById('addBtn')
//
const filterBtn = document.getElementById('filterBtn')
const resetBtn = document.getElementById('resetFilterBtn')
const gamesTable = document.getElementById('gamesTable')
//
const gameArray = []

function checkCorrectInput() {
	if (
		inputGameTitle.value.length === 0 ||
		inputGenres.value.length === 0 ||
		inputPrice.value.length === 0 || // TODO CHECK IF INPUT IS NUMBER
		isNaN(parseFloat(inputPrice.value)) ||
		inputService.value.length === 0 ||
		inputPublisher.value.length === 0
	) {
		return false
	} else {
		return true
	}
}

function insertInputtedData(objectToAdd) {
	return `<tr>
	<td><button class="done-btn">✓</button></td>
	<td>${objectToAdd.gameTitle}</td>
	<td>${objectToAdd.genres}</td>
	<td>${objectToAdd.price}</td>
	<td>${objectToAdd.service}</td>
	<td>${objectToAdd.publisher}</td>
	<td>${new Date().toLocaleDateString()}</td>`
}

function clearInputFields() {
	inputGameTitle.value = ''
	inputGenres.value = ''
	inputPrice.value = ''
	inputService.value = ''
	inputPublisher.value = ''
}

addGameBtn.onclick = function () {
	if (checkCorrectInput()) {
		console.log('Good input dude')
		const newGame = {
			gameTitle: inputGameTitle.value,
			genres: inputGenres.value,
			price: parseInt(inputPrice.value),
			service: inputService.value,
			publisher: inputPublisher.value,
		}
		gameArray.push(newGame)
		clearInputFields()
		gamesTable.insertAdjacentHTML('afterbegin', insertInputtedData(newGame))
		console.log(gameArray.length)
	} else if (!checkCorrectInput()) {
		errorMessage.style.display = 'block'
		setTimeout(function () {
			errorMessage.style.display = 'none'
		}, 2000)
		console.log('Bad input dude')
	}
}
//complete btn
gamesTable.addEventListener('click', function (event) {
	if (event.target && event.target.classList.contains('done-btn')) {
		const row = event.target.closest('tr')
		const isRed = row.cells[1].style.color === 'red'
		row.querySelectorAll('td').forEach(cell => {
			cell.style.color = isRed ? '' : 'red' // Если цвет уже красный, сбрасываем его, иначе ставим красный
		})
	}
})
//FILTER of games

filterBtn.onclick = function () {
	const filterOptions = document.getElementById('filterOptions')
	filterOptions.style.display =
		filterOptions.style.display === 'none' ? 'block' : 'none'
}

document.querySelectorAll('.filter-option').forEach(button => {
	button.onclick = function () {
		const filterType = button.getAttribute('data-filter')
		const filterValue = prompt(`Enter the ${filterType} to filter by:`)
		filterTable(filterType, filterValue)
	}
})

function filterTable(filterType, filterValue) {
	const rows = document.querySelectorAll('#gamesTable tbody tr')

	rows.forEach(row => {
		const cellValue = row.querySelector(
			`td:nth-child(${getFilterColumnIndex(filterType)})`
		).textContent
		if (cellValue.toLowerCase().includes(filterValue.toLowerCase())) {
			row.style.display = ''
		} else {
			row.style.display = 'none'
		}
	})
}

function getFilterColumnIndex(filterType) {
	switch (filterType) {
		case 'genre':
			return 3
		case 'price':
			return 4
		case 'service':
			return 5
		case 'publisher':
			return 6
		default:
			return 0
	}
}

resetBtn.onclick = function () {
	//здесь я делаю ресет фильтров
	const rows = document.querySelectorAll('#gamesTable tbody tr')
	rows.forEach(row => {
		row.style.display = ''
	})
}
