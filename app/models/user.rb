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
#

class User < ActiveRecord::Base
  validates(
    :username,
    :password_digest,
    :session_token,
    :profile_photo_path,
    :cover_photo_path,
    presence: true
  )

  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  attr_reader :password

  after_initialize :ensure_session_token
  after_initialize :ensure_photos

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

  def ensure_photos
    self.profile_photo_path ||= "drake.png"
    self.cover_photo_path ||= "drake.png"
  end

  # Other
  def drakeships
    # accepted_statuses ||= ['accepted', 'pending']
    # accepted_statuses_filter = accepted_statuses.map do |status|
    #   <<-SQL
    #     (drakeship.request_status = ?)
    #   SQL
    # end.join(' OR ')

    # accepted_statuses_filter = '(drakeships.request_status IN (' +
    #   (statuses.map { |status| "'#{status}'" } .join(', ')) + ')'

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

    # User.joins("#{subquery} AS drakes ON users.id = drakes.id")
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

# subquery = <<-SQL
#   (SELECT (
#      CASE WHEN requested.id = #{self.id}
#      THEN received.id
#      ELSE requested.id
#      END
#    ) AS id
#   FROM
#     users AS requested
#   JOIN
#     drakeships ON drakeships.requester_id = requested.id
#   JOIN
#     users AS received ON drakeships.recipient_id = received.id
#   WHERE
#     requested.id = #{self.id} OR received.id = #{self.id}
#   )
# SQL

# SELECT (
#   CASE WHEN requested.id = 1
#   THEN received.*
#   ELSE requested.*
#   END
# ) FROM
#   users AS requested
# JOIN
#   drakeships ON drakeships.requester_id = requested.id
# JOIN
#   users AS received ON drakeships.recipient_id = received.id
#   WHERE
#     requested.id = 1 OR received.id = 1
