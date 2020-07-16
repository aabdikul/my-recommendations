class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :review
      t.integer :upvotes
      t.integer :downvotes

      t.timestamps
    end
  end
end
