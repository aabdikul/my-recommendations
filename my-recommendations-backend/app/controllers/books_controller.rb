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

	def show
		book = Book.find_by_id(params[:id])
		render json: book.to_json(
			:except => [:created_at, :updated_at]
		)
	end

	def update
		book = Book.find_by_id(params[:book_id])
		book.update(params.require(:book).permit(:favorite))
		render json: book.to_json(
			:except => [:created_at, :updated_at]
		)
	end



end


