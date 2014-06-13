class AddColumnsToStats < ActiveRecord::Migration
  def change
    add_column :stats, :steals, :integer
    add_column :stats, :freethrows_made, :integer
    add_column :stats, :freethrows_attempted, :integer
    add_column :stats, :offensive_rebounds, :integer
  end
end
