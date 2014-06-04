class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :first_name
      t.string :last_name
      t.string :height
      t.float :weight
      t.string :position
      t.references :team, index: true
      t.integer :number

      t.timestamps
    end
  end
end
