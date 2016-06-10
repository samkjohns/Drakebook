json.id @post.id

json.author do
  json.username @post.author.username
  json.authorId @post.author.id
end

json.body @post.body

json.postable do
  json.id @post.postable_id
  json.type @post.postable_type
  if (@post.postable_type == "User")
    json.username @post.postable.username
  end
end

json.comments @post.comments do |comment|
  json.id comment.id

  json.author do
    json.username comment.author.username
    json.authorId comment.author.id
  end

  json.body comment.body
end
