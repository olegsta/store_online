class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.integer :year
      t.string :actor
      t.string :language
      t.boolean :subtitle
      t.string :title
      t.string :category
      t.timestamps null: false
    end
  end
end
