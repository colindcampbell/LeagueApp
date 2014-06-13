class DropTableLeagueTeams < ActiveRecord::Migration
  def change
  	drop_table :league_teams
  end
end
