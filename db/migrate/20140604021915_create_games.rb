class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :location
      t.time :time
      t.string :sport
      t.integer :home_score
      t.integer :away_score
      t.boolean :recorded
      t.boolean :final
      t.boolean :half
      t.integer :home_team_id
      t.integer :away_team_id
      t.boolean :ot
      t.references :day, index: true

      t.timestamps
    end
  end
end
