class AddReadStatusToBooks < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :read_status, :boolean
  end
end
