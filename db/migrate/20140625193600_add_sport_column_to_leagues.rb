class AddSportColumnToLeagues < ActiveRecord::Migration
  def change
    add_column :leagues, :sport, :string
  end
end
