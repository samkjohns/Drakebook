class Drakeship < ActiveRecord::Base
  validates :requester_id, :recipient_id, presence: true
  validates :request_status, inclusion: [ "pending", "accepted", "rejected" ]

  belongs_to :requester, class_name: "User"
  belongs_to :recipient, class_name: "User"
end
