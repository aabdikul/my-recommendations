class RemoveReadFromBooks < ActiveRecord::Migration[6.0]
  def change
    remove_column :books, :read, :string
  end
end
