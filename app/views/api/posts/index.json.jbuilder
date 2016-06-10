json.userId @postable_id
json.array! @posts do |post|
  json.id post.id

  json.author do
    json.username post.author.username
    json.authorId post.author.id
  end

  json.postable do
    json.id post.postable_id
    json.type post.postable_type
    if (post.postable_type == "User")
      json.username post.postable.username
    end
  end

  json.body post.body

  json.comments post.comments.order(:created_at) do |comment|
    json.id comment.id

    json.author do
      json.username comment.author.username
      json.authorId comment.author.id
    end

    json.body comment.body
  end
end
