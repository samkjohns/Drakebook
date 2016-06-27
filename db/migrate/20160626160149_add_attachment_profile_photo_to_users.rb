class AddAttachmentProfilePhotoToUsers < ActiveRecord::Migration
  def self.up
    remove_column :users, :profile_photo_path
    change_table :users do |t|
      t.attachment :profile_photo
    end
  end

  def self.down
    remove_attachment :users, :profile_photo
    add_column :users, :profile_photo_path, :string, null: false
  end
end
