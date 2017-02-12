class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.integer :user_id
      t.text :description
      t.attachment :uploaded_file
      t.string :category
      t.decimal :price, precision: 8, scale: 2
      t.text :full_description
      t.timestamps null: false
    end
  end
end
