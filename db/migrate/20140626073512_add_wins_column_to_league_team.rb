class AddWinsColumnToLeagueTeam < ActiveRecord::Migration
  def change
    add_column :league_teams, :wins, :integer
  end
end
