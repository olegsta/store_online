class CreateMessagestoadministrators < ActiveRecord::Migration
  def change
    create_table :messagestoadministrators do |t|
      t.string :name
      t.integer :user_id
      t.integer :telephone
      t.string :email
      t.string :message

      t.timestamps null: false
    end
  end
end
