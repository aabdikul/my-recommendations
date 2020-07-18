const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {
	fetchBooks();

})	

let main = document.querySelector('main')

function fetchBooks() {
	fetch(BOOKS_URL)
		.then(function(response) {
		return response.json();
		})
		.then(function(json) {
		renderBooks(json);
		renderReviews(json)
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

		const whiteHeart = '\u2661';
		const blackHeart = '\u2665';

		let favorite = document.createElement("button")
			if (e.favorite == true) {
				favorite.innerHTML = blackHeart
			}
			else {
				favorite.innerHTML = whiteHeart
			}
		left.appendChild(favorite)


		let seeReviews = document.createElement('button')
		seeReviews.innerHTML = "See Reviews"
		left.appendChild(seeReviews)

		seeReviews.addEventListener('click', function(event) {
			renderReviews()
		})

		let readTag = document.createElement("button")
		readTag.innerHTML = e.read
		left.appendChild(readTag)

		return main.appendChild(card)
	})
}

function renderReviews(books) {
	let reviewCard = document.createElement('div')
	reviewCard.setAttribute("class", "card")

	books.map(function(book) {
		book.reviews.map(function(review) {
			let eachReview = document.createElement('p')
			eachReview.innerHTML = "Review: " + review.review
			reviewCard.appendChild(eachReview)
		})
	})

	return main.appendChild(reviewCard)
}









