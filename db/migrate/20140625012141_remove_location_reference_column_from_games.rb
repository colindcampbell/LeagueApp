class RemoveLocationReferenceColumnFromGames < ActiveRecord::Migration
  def change
  	remove_column :games, :location_id, :integer
  end
end
