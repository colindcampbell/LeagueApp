class AddLeagueTeamsColumnsToGame < ActiveRecord::Migration
  def change
    add_column :games, :home_league_team_id, :integer
    add_column :games, :away_league_team_id, :integer
  end
end
