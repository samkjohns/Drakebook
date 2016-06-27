class AddAttachmentCoverPhotoToUsers < ActiveRecord::Migration
  def self.up
    remove_column :users, :cover_photo_path
    change_table :users do |t|
      t.attachment :cover_photo
    end
  end

  def self.down
    remove_attachment :users, :cover_photo
    add_column :users, :cover_photo_path, :string, null: false
  end
end
