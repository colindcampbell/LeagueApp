class AddColumnsToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :coach, :string
    add_column :teams, :email, :string
    add_column :teams, :phone, :string
  end
end
