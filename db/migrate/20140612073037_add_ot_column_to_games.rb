class AddOtColumnToGames < ActiveRecord::Migration
  def change
    add_column :games, :ot, :integer
  end
end
