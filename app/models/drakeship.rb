# == Schema Information
#
# Table name: drakeships
#
#  id                :integer          not null, primary key
#  requester_id      :integer          not null
#  recipient_id      :integer          not null
#  relationship_type :string
#  request_status    :string           default("pending"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

  class Drakeship < ActiveRecord::Base
  validates :requester_id, :recipient_id, presence: true
  validates :request_status, inclusion: [ "pending", "accepted", "rejected" ]

  belongs_to :requester, class_name: "User"
  belongs_to :recipient, class_name: "User"
end
