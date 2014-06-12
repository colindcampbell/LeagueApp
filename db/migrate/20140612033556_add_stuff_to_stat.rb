class AddStuffToStat < ActiveRecord::Migration
  def change
    add_column :stats, :assists, :integer
    add_column :stats, :rebounds, :integer
    add_column :stats, :field_goals, :integer
    add_column :stats, :fg_attempts, :integer
    add_column :stats, :fouls, :integer
    add_column :stats, :blocks, :integer
    add_column :stats, :threes, :integer
    add_column :stats, :turnovers, :integer
    add_column :stats, :touchdowns, :integer
    add_column :stats, :pass_yards, :integer
    add_column :stats, :rush_yards, :integer
    add_column :stats, :receiving_yards, :integer
    add_column :stats, :tackles, :integer
    add_column :stats, :sacks, :integer
    add_column :stats, :interceptions, :integer
    add_column :stats, :fumbles, :integer
  end
end
