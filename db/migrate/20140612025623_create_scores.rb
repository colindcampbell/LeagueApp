class CreateStats < ActiveRecord::Migration
  def change
    create_table :stats do |t|
      t.references :game, index: true
      t.references :player, index: true
      t.integer :points
      t.string :type

      t.timestamps
    end
  end
end
