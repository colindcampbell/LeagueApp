class AddDateColumnToGames < ActiveRecord::Migration
  def change
    add_column :games, :date, :datetime
  end
end
