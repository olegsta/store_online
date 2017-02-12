class CreateVoices < ActiveRecord::Migration
  def change
    create_table :voices do |t|
      t.integer :votable_id
      t.string :votable_type
      t.integer :voter_id
      t.string :voter_type
      t.boolean :vote_flag
      t.integer :sum_voices, default: 1
      t.timestamps null: false
    end
  end
end
