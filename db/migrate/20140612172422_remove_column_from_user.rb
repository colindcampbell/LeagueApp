class RemoveColumnFromUser < ActiveRecord::Migration
  def change
  	remove_column :teams, :coach_email, :string
  	remove_column :teams, :coach_phone, :integer
  	remove_column :teams, :coach_name, :string
  end
end
