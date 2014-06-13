class AddTypeColumnToLeagues < ActiveRecord::Migration
  def change
  	add_column :leagues, :type, :string
  end
end
