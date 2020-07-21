class ReviewsController < ApplicationController

	def index
		reviews = Review.all
		render json: reviews.to_json(
			:except => [:created_at, :updated_at]
		)
	end	

	def create
		review = Review.new(params.require(:review).permit(:book_id, :review))
		review.save
		render json: review.to_json(
			:except => [:created_at, :updated_at]
			)
	end

end
