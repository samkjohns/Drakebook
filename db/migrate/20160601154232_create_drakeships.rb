class CreateDrakeships < ActiveRecord::Migration
  def change
    create_table :drakeships do |t|
      t.integer :requester_id, null: false
      t.integer :recipient_id, null: false
      t.string :relationship_type
      t.string :request_status, null: false, default: "pending"
      t.timestamps null: false
    end

    add_index :drakeships, :requester_id
    add_index :drakeships, :recipient_id
  end
end
