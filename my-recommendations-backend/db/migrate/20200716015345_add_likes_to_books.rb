class AddLikesToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :likes, :integer
  end
end
