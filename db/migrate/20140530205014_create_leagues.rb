class CreateLeagues < ActiveRecord::Migration
  def change
    create_table :leagues do |t|
      t.string :name
      t.string :locations
      t.date :start_date
      t.date :end_date
      t.text :description
      t.references :user, index: true

      t.timestamps
    end
  end
end
