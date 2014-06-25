class AddColumnToGame < ActiveRecord::Migration
  def change
    add_column :games, :location, :string
  end
end
