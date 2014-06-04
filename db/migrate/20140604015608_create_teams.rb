class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :wins
      t.integer :losses
      t.integer :ties
      t.string :coach_name
      t.string :coach_email
      t.string :coach_phone
      t.string :home_city
      t.references :league, index: true

      t.timestamps
    end
  end
end
