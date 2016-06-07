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

require 'test_helper'

class DrakeshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
