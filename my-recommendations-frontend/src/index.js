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

		let cardsContainer = document.createElement('div')
		cardsContainer.setAttribute("class", "flip-card-container")
		main.appendChild(cardsContainer)

		let card = document.createElement('div')
		card.setAttribute("class", "card")
		cardsContainer.appendChild(card)

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

		seeReviews.onclick = function(event) {

    		if (backCard.style.transform == "rotateY(180deg)") {
     			backCard.style.transform = "rotateY(0deg)";
    			}
    		else {
     			backCard.style.transform = "rotateY(180deg)";
    		}

		}

		let readTag = document.createElement("span")
		readTag.classList.add("read")
		if (e.read_status == true) {
			readTag.innerHTML = "Read"
		}
		else {
			readTag.innerHTML = "Unread"
		}
		left.appendChild(readTag)

		readTag.addEventListener("click", function(event) {
			markRead(e.id, readTag)
		})

		let backCard = document.createElement('div')
		backCard.setAttribute("class", "back-card")
		renderReviews(e.id).then(function(thingis) {
			thingis.map(function(thingi) {
				backCard.appendChild(thingi)
			})
		})

		let backHeader = document.createElement('h2')
		backHeader.innerHTML = `Reviews of ${e.title}`
		backCard.appendChild(backHeader)

		let frontButton = document.createElement('button')
		frontButton.innerHTML = "Return to Book"
		backCard.appendChild(frontButton)

		frontButton.onclick= function(event) {
			if (backCard.style.transform == "rotateY(180deg)") {
     			backCard.style.transform = "rotateY(0deg)";
    			}
    		else {
     			backCard.style.transform = "rotateY(180deg)";
    		}
		}

		cardsContainer.appendChild(backCard)	

	})
}

function renderReviews(bookId) {

	return fetch(`http://localhost:3000/books/${bookId}`)

		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			return json.reviews.map(function(objects) {
				let userReviews = document.createElement('p')
				userReviews.innerHTML = objects.review
				return userReviews
			})
		
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

function markRead(bookId, readSpan) {

	function readOrUnread() {
		if (readSpan.innerHTML == "Read") {
			return true
		}
		else {
			return false
		}
	}

	updateReadStatus(bookId, readOrUnread())
	.then(function(e) {
		if (!readOrUnread() == true) {
			readSpan.innerHTML = "Read"
		}
		else {
			readSpan.innerHTML = "Unread"
		}
	})
}

function updateReadStatus(bookId, readUnreadStatus) {
	let formData = {
		book_id: bookId,
		read_status: !readUnreadStatus
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





