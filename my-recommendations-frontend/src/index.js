const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
	fetchBooks();
})

function fetchBooks() {
	fetch(BOOKS_URL)
		.then(function(response) {
		return response.json();
		})
		.then(function(json) {
			console.log(json)
		});
}

