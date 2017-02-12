class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :commentable_id
      t.string :from_ip
      t.string :commentable_type
      t.integer :user_id
      t.integer :posting_id
      t.integer :info_id
      t.attachment :image_comment
      t.timestamps null: false
    end
  end
end
