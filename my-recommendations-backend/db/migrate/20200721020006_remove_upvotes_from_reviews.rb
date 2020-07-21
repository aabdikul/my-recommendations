class RemoveUpvotesFromReviews < ActiveRecord::Migration[6.0]
  def change
    remove_column :reviews, :upvotes, :integer
  end
end
