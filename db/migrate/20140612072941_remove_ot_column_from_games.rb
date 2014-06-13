class RemoveOtColumnFromGames < ActiveRecord::Migration
  def change
    remove_column :games, :ot, :boolean
  end
end
