const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
	fetchBooks()
})	

let main = document.querySelector('main')
const whiteHeart = '\u2661';
const blackHeart = '\u2665';

function fetchBooks() {
	return fetch(BOOKS_URL)
		.then(function(response) {
		return response.json();
		})
		.then(function(json) {
		renderBooks(json);
		renderReviews(json)
		return json
		});
}

function renderBooks(books) {	

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

		let img = document.createElement('img')
		img.src = e.image
		right.appendChild(img)

		let favorite = document.createElement("span")
		favorite.classList.add("heart")
			if (e.favorite == true) {
				favorite.innerHTML = blackHeart //true
			}
			else {
				favorite.innerHTML = whiteHeart //false
			}
		left.appendChild(favorite)

		favorite.addEventListener("click", function(event) {
			favoriteBook(e.id, favorite)
		})


		let seeReviews = document.createElement('button')
		seeReviews.innerHTML = "See Reviews"
		left.appendChild(seeReviews)

		seeReviews.addEventListener('click', function(event) {
			renderReviews(e.id)
		})

		let readTag = document.createElement("span")
		readTag.innerHTML = e.read
		left.appendChild(readTag)

		return main.appendChild(card)
	})
}

function renderReviews(bookId) {

	let backCard = document.createElement('div')

	return fetch(`http://localhost:3000/books/${bookId}`)

		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			json.reviews.map(function(reviews) {
				let userReviews = document.createElement('p')
				userReviews.innerHTML = reviews.review
				backCard.appendChild(userReviews)
			})
		main.appendChild(backCard)
		})

}

function favoriteBook(bookId, heartSpan) {

	function trueOrFalse() {
		if (heartSpan.innerHTML == blackHeart) {
			return true
		}
		else {
			return false
		}
	}

	updateDatabaseHeart(bookId, trueOrFalse())
	.then(function(e) {
		if (!trueOrFalse() == true) {
			heartSpan.innerHTML = blackHeart
		}
		else {
			heartSpan.innerHTML = whiteHeart
		}
	})
}



function updateDatabaseHeart(bookId,trueFalseValue) {
	let formData = {
		book_id: bookId, 
		favorite: !trueFalseValue
	};

	let configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(formData)
	};

	return fetch(`http://localhost:3000/books/${bookId}`,configObj)

	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		return json;
	})
}




