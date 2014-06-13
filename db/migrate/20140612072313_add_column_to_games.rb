class AddColumnToGames < ActiveRecord::Migration
  def change
    add_reference :games, :location, index: true
  end
end
