class AddProfileDetailColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :email, :string
    add_column :users, :phone_number, :string
    add_column :users, :hometown, :string
    add_column :users, :current_city, :string
    add_column :users, :high_school, :string
    add_column :users, :college, :string
    add_column :users, :college_major, :string
    add_column :users, :intro, :text
    add_column :users, :name_pronunciation, :string
  end
end
