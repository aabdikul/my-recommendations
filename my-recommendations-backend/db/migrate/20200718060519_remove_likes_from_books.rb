class RemoveLikesFromBooks < ActiveRecord::Migration[6.0]
  def change
    remove_column :books, :likes, :integer
  end
end
