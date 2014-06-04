class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.date :date
      t.references :league, index: true

      t.timestamps
    end
  end
end
