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

		let h3 = document.createElement('h3')
		h3.innerHTML = e.title
		card.appendChild(h3)

		let h4 = document.createElement('h4')
		h4.innerHTML = "By: " + e.author
		card.appendChild(h4)

		let p1 = document.createElement('p')
		p1.innerHTML = "Genre: " + e.genre
		card.appendChild(p1)

		let p2 = document.createElement('p')
		p2.innerHTML = "Description: " + e.description
		card.appendChild(p2)


		main.appendChild(card)
	})
}

