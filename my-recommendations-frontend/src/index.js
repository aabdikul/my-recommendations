const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
	fetchBooks();
})	

function fetchBooks() {
	//Grabbing the full array of all of the books from my backend DB. 
	fetch(BOOKS_URL)
		.then(function(response) {
		return response.json();
		})
		.then(function(json) {
		return renderBooks(json);
		});
}

function renderBooks(books) {
	let main = document.querySelector('main')

	books.map(function(e) {
		let card = document.createElement('div')
		card.setAttribute("class", "card")
		card.setAttribute("id", "container")

		let left = document.createElement('div')
		left.setAttribute("class", "left")
		card.appendChild(left)

		let right = document.createElement('div')
		right.setAttribute("class", "right")
		card.appendChild(right)

		let h3 = document.createElement('h3')
		h3.innerHTML = e.title
		left.appendChild(h3)

		let h4 = document.createElement('h4')
		h4.innerHTML = "By: " + e.author
		left.appendChild(h4)

		let p2 = document.createElement('p')
		p2.innerHTML = "Description: " + e.description
		left.appendChild(p2)

		let p1 = document.createElement('p')
		p1.innerHTML = "Genre: " + e.genre
		left.appendChild(p1)

		main.appendChild(card)
	})
}

