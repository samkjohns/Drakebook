# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  profile_photo_path :string           not null
#  cover_photo_path   :string           not null
#  birth_date         :date
#  workplace          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  email              :string
#  phone_number       :string
#  hometown           :string
#  current_city       :string
#  high_school        :string
#  college            :string
#  college_major      :string
#  intro              :text
#  name_pronunciation :string
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
