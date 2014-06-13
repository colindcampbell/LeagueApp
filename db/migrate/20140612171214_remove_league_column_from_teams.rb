class RemoveLeagueColumnFromTeams < ActiveRecord::Migration
  def change
  	remove_column :teams, :league_id, :integer
  end
end
