class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.references :product, index: true, foreign_key: true
      t.belongs_to :cart, index: true, foreign_key: true
      t.integer :quantity, default: 1
      t.integer :price
      t.integer :order_id
      t.timestamps null: false
    end
  end
end
