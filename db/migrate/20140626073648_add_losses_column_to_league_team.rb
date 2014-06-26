class AddLossesColumnToLeagueTeam < ActiveRecord::Migration
  def change
    add_column :league_teams, :losses, :integer
  end
end
