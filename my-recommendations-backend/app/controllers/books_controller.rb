class BooksController < ApplicationController

	def index
		books = Book.all
		render json: books.to_json(
			:include => {
				:reviews => {:except => [:created_at, :updated_at]}
			},
			:except => [:created_at, :updated_at]
		)
	end

end


