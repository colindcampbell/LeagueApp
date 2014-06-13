class ChangeColumnInStats < ActiveRecord::Migration
  def change
  	rename_column :stats, :rebounds, :defensive_rebounds
  end
end
