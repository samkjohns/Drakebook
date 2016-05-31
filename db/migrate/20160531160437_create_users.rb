class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :profile_photo_path, null: false
      t.string :cover_photo_path, null: false
      t.date :birth_date
      t.string :workplace
      t.timestamps null: false
    end

    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
