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

class User < ActiveRecord::Base
  # paperclip validations
  has_attached_file :profile_photo, default_url: "default-avatar.png"
  validates_attachment_content_type :profile_photo, content_type: /\Aimage\/.*\Z/

  has_attached_file :cover_photo, default_url: "default-cover.png"
  validates_attachment_content_type :cover_photo, content_type: /\Aimage\/.*\Z/

  # other validations
  validates(
    :username,
    :password_digest,
    :session_token,
    presence: true
  )

  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  
  after_initialize :ensure_session_token
  attr_reader :password

  has_many(
    :requested_drakeships,
    class_name: "Drakeship",
    foreign_key: :requester_id
  )

  has_many :requested_drakes, through: :requested_drakeships, source: :recipient

  has_many(
    :received_drakeships,
    class_name: "Drakeship",
    foreign_key: :recipient_id
  )

  has_many :received_drakes, through: :received_drakeships, source: :requester

  has_many :authored_posts, class_name: "Post", foreign_key: :author_id
  has_many :wall_posts, class_name: "Post", as: :postable

  # Auth methods
  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def password=(password)
    @password = password
    self.password_digest ||= BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest) == password
  end

  def reset_session_token
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end


  ### ----------------------------- CUSTOM SQL ----------------------------- ###

  def drakeships
    subquery = <<-SQL
      (SELECT (
         CASE WHEN drakeships.requester_id = #{self.id}
         THEN drakeships.recipient_id
         ELSE drakeships.requester_id
         END
       ) AS id
      FROM
        drakeships
      WHERE
        (drakeships.requester_id = #{self.id} OR drakeships.recipient_id = #{self.id})
        AND (drakeships.request_status = 'accepted')
      )
    SQL

    query = <<-SQL
      SELECT
        users.*
      FROM
        users
      JOIN
        #{subquery} AS drakes ON users.id = drakes.id
    SQL

    User.find_by_sql(query)
  end

  def pending_drakeships
    subquery = <<-SQL
      (SELECT (
         CASE WHEN drakeships.requester_id = #{self.id}
         THEN drakeships.recipient_id
         ELSE drakeships.requester_id
         END
       ) AS id
      FROM
        drakeships
      WHERE
        (drakeships.requester_id = #{self.id} OR drakeships.recipient_id = #{self.id})
        AND (drakeships.request_status = 'pending')
      )
    SQL

    query = <<-SQL
      SELECT
        users.*
      FROM
        users
      JOIN
        #{subquery} AS drakes ON users.id = drakes.id
    SQL

    User.find_by_sql(query)
  end
end
