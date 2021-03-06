const BOOKS_URL = "http://localhost:3000/books"

let buttonSort = document.querySelector("input[name='sort-button']")
buttonSort.addEventListener("click", () => {
	clearAllBooks();
	sortAllBooks();
})

function sortAllBooks() {
		fetch(BOOKS_URL)
		.then(resp => resp.json())
		.then(json => {
			return json.sort(function(a,b) {
			let titleA = a.title.toUpperCase();
			let titleB = b.title.toUpperCase();
			if (titleA < titleB) {
				return -1;
			}
			if (titleA > titleB) {
				return 1;
			}
			return 0;
		})
	})
	.then(json=> renderBooks(json));
}

function clearAllBooks() {	
	let allFlips = document.querySelectorAll(".flip-card-container")
	for (const flip of allFlips) {
		flip.remove()
	}
}


//global variables
let addBook = false; 
let main = document.querySelector('main')
const whiteHeart = '\u2661';
const blackHeart = '\u2665';

document.addEventListener("DOMContentLoaded", function() {
	fetchBooks();

		const newBookBtn = document.querySelector("#new-book") //button to add a new book
		const bookFormContainer = document.getElementById("book-form");//add book form
		const bookTitle = document.querySelector("input[name='title']");//fields in form
  		const bookAuthor = document.querySelector("input[name='author']");
  		const bookGenre = document.querySelector("input[name='genre']");
  		const bookDescription = document.querySelector("input[name='description']");
  		const bookImage = document.querySelector("input[name='image']");

	newBookBtn.addEventListener("click", () => { //gives ability to click and display new book form
    	addBook = !addBook;
    	if (addBook) {
    	  bookFormContainer.style.display = "block";
    	} else {
    	  bookFormContainer.style.display = "none";
    	}	
  	});

	const addBookBtn = document.querySelector("input[name='submit']") //submit a new book 
  		addBookBtn.addEventListener('click', (event) => {
    	event.preventDefault();
    	let bookTitleInput = bookTitle.value
    	let bookAuthorInput = bookAuthor.value
    	let bookGenreInput = bookGenre.value
    	let bookDescriptionInput = bookDescription.value
    	let bookImageInput = bookImage.value
    	submitBook(bookTitleInput, bookAuthorInput, bookGenreInput, bookDescriptionInput, bookImageInput)
  })

})

function fetchBooks() {//fetch from Rails backend
	return fetch(BOOKS_URL)
		.then(resp => resp.json())
		.then(json => renderBooks(json));
}

class Card {
	constructor(id, title, author, genre, description, image, rating, favorite, read_status) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.description = description; 
		this.image = image;
		this.rating = rating;
		this.favorite = favorite;
		this.read_status = read_status
	}

	renderCard() {//render cards function

		let cardsContainer = document.createElement('div') //creates entire card container 
		cardsContainer.setAttribute("class", "flip-card-container")
		main.appendChild(cardsContainer) 

		let card = document.createElement('div')//entire front of the card
		card.setAttribute("class", "card")
		cardsContainer.appendChild(card)

		let left = document.createElement('div')//left side of front of card
		left.setAttribute("class", "left")
		card.appendChild(left)

		let right = document.createElement('div')//right side of front of card
		right.setAttribute("class", "right")
		card.appendChild(right)

			let favorite = document.createElement("span")//heart icon 
			favorite.classList.add("heart")
			favorite.setAttribute("id", `heart-${this.id}`)
			left.appendChild(favorite)
			
			if (this.favorite == true) {//if favorite is true, set to blackheart
				favorite.innerHTML = blackHeart 
			}
			else {
				favorite.innerHTML = whiteHeart //else false
			}


			let h3 = document.createElement('h3')//inner parts of left side of card
			h3.innerHTML = this.title
			left.appendChild(h3)

			let h4 = document.createElement('h4')
			h4.innerHTML = "By: " + this.author
			left.appendChild(h4)

		let p2 = document.createElement('p')//inner parts of left side of card
		p2.innerHTML = "Description: " + this.description
		left.appendChild(p2)

		let p1 = document.createElement('p')//inner parts of left side of card
		p1.innerHTML = "Genre: " + this.genre
		left.appendChild(p1)

		let img = document.createElement('img')//inner parts of right side of card
		img.src = this.image
		right.appendChild(img)

		let seeReviews = document.createElement('button')//see reviews button
		seeReviews.innerHTML = "See Reviews"
		left.appendChild(seeReviews)

		seeReviews.addEventListener("click", (event) => { //add event on click to rotate the card

    		if (backCard.style.transform == "rotateY(180deg)") {
     			backCard.style.transform = "rotateY(0deg)";
    			}
    		else {
     			backCard.style.transform = "rotateY(180deg)";
    		}
		})
		

		let readTag = document.createElement("span")
		readTag.classList.add("read")
			if (this.read_status == true) {
				readTag.innerHTML = "Read"//add read or unread based on read_status
			}
			else {
				readTag.innerHTML = "Unread"
			}
		left.appendChild(readTag)

		let backCard = document.createElement('div')
		backCard.setAttribute("class", "back-card")//create container of back of card

		renderReviews(this.id).then(function(allReviews) {
			allReviews.map(function(individualReview) {//run function to render reviews, pull from promise, then iterate and render each reviews
				backCard.appendChild(individualReview)
			})
		})

		let backHeader = document.createElement('h2')
		backHeader.innerHTML = `Reviews of ${this.title}`
		backCard.appendChild(backHeader)

		let frontButton = document.createElement('button')
		frontButton.innerHTML = "Return to Book" //flip back to front button
		backCard.appendChild(frontButton)

		frontButton.addEventListener("click", (event) => {
			if (backCard.style.transform == "rotateY(180deg)") {//on click, flip back to front
     			backCard.style.transform = "rotateY(0deg)";
    			}
    		else {
     			backCard.style.transform = "rotateY(180deg)";
    		}
		})
//
		let writeReviewBtn = document.createElement('button')
		writeReviewBtn.setAttribute("class", "review-button")
		writeReviewBtn.innerHTML = "Write A Review"
		backCard.appendChild(writeReviewBtn)

		let reviewFormContainer = document.getElementById('review-form').cloneNode(true)
		reviewFormContainer.id = `review-form-${this.id}`

		let submitReviewBtn = reviewFormContainer.querySelector("input[name='submit-review']")
//
		cardsContainer.appendChild(backCard)

		let idKeeper = this.id
		let ratingKeeper = this.rating

		let promiseKeeper = new Promise(function(resolve,reject) {
			resolve({
				id: idKeeper,
				rating: ratingKeeper,
				heartSpan: favorite,
				readSpan: readTag,
				backCard: backCard,
				writeReviewBtn: writeReviewBtn,
				reviewFormContainer: reviewFormContainer,
				submitReviewBtn: submitReviewBtn,
				left: left,
				authorTag: h4 
			})
		})

		return promiseKeeper
	}
}	

function renderBooks(books) {	
	books.map(function(e) {

		let newCard = new Card(e.id, e.title, e.author, e.genre, e.description, e.image, e.rating, e.favorite, e.read_status)
		
		newCard.renderCard().then(function(r) {

			r.heartSpan.addEventListener("click", function(event) {
				favoriteBook(r.id, r.heartSpan)//add click event and then run function to favorite/unfavorite book
			})

			r.readSpan.addEventListener("click", function(event) {
				markRead(r.id, r.readSpan)//on click mark something as read or unread
			})

			r.writeReviewBtn.addEventListener("click", function(event) {
				r.reviewFormContainer.style.display = "block"
				r.backCard.appendChild(r.reviewFormContainer)
			})

			r.submitReviewBtn.addEventListener("click",function(event) {
				event.preventDefault()
				let writtenReview = r.reviewFormContainer.querySelector("input[name='review']")
				let writtenReviewValue = writtenReview.value
				submitBookReview(r.id, writtenReviewValue).then(function(e) {
					r.reviewFormContainer.style.display = "none"
					let singleReview = document.createElement('p')
					singleReview.innerHTML = "Review: ".bold() + e.review
					r.backCard.appendChild(singleReview)
				})
			})

			if (r.rating === 0) {
				let rateFormContainer = document.getElementById("rating-form").cloneNode(true);//if the book has no rating, add the button to rate
				rateFormContainer.id = `rating-form-${r.id}`
				let rateButton = document.createElement('button')
				rateButton.innerHTML = "Rate Book"
				r.authorTag.after(rateButton)

				rateButton.addEventListener("click", function(event) {
					rateFormContainer.style.display = "block"
					r.left.appendChild(rateFormContainer)
					const submitRating = rateFormContainer.querySelector("input[name='submit-rating']")
					submitRating.addEventListener("click", function(event) {
						let ratingValue = rateFormContainer.querySelector("input[name='rating']");
						let finalRating = parseInt(ratingValue.value,10)//grab rating from field and submit to function
						addRating(r.id, finalRating)
					})
				})
			}
			else {
				let bookRating = document.createElement('span')//book rating UI

				const whiteStar = '\u2606';

				const blackStar = '\u2605';
		
	
				if (r.rating == 5) {
					bookRating.textContent = blackStar + blackStar + blackStar + blackStar + blackStar
				} 
				else if (r.rating == 4) {
					bookRating.textContent = blackStar + blackStar + blackStar + blackStar + whiteStar
				}
				else if (r.rating == 3) {
					bookRating.textContent = blackStar + blackStar + blackStar + whiteStar + whiteStar
				}
				else if (r.rating == 2) {
					bookRating.textContent = blackStar + blackStar + whiteStar + whiteStar + whiteStar
				}
				else {
					bookRating.textContent = blackStar + whiteStar + whiteStar + whiteStar + whiteStar 
				}
			
				r.authorTag.after(bookRating)//show rating if book has rating
			}
		})
		

	})
}

function renderReviews(bookId) {//render reviews based on ID

	return fetch(`http://localhost:3000/books/${bookId}`)

		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			return json.reviews.map(function(objects) {
				let userReviews = document.createElement('p')
				let string = "Review: "
				userReviews.innerHTML = string.bold() + objects.review
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


function submitBook(inputTitle, inputAuthor, inputGenre, inputDescription, inputImage) {

  let inputObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        title: inputTitle,
        author: inputAuthor,
        genre: inputGenre,
        description: inputDescription, 
        image: inputImage,
        rating: 0, 
        favorite: false,
        read_status: false
      } )
    }

  return fetch('http://localhost:3000/books', inputObject)

  .then(function(response) {
    return response.json
  })
  .then(function(json) {
    location.reload()
  })

}

function addRating(bookId, ratingInput) {

	let inputObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        book_id: bookId,
        rating: ratingInput
      } )
    }

  return fetch(`http://localhost:3000/books/${bookId}`, inputObject)

  .then(function(response) {
    return response.json
  })
  .then(function(json) {
    location.reload()
  })

}

function submitBookReview(bookId, userReview) {

	let inputObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        review: userReview,
        book_id: bookId
      })
    }

  return fetch('http://localhost:3000/reviews', inputObject)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    return json
  })

}







