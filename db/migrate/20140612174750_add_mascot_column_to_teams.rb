class AddMascotColumnToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :mascot, :string
  end
end
