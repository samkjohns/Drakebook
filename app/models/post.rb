class Post < ActiveRecord::Base
  validates(
    :author_id,
    :postable_id,
    :postable_type,
    :body,
    presence: true
  )

  belongs_to :author, class_name: "User"
  belongs_to :postable, polymorphic: true

  has_many :comments, class_name: "Post", as: :postable
end
