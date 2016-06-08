json.id @post.id

json.author do
  json.username @post.author.username
  json.authorId @post.author.id
end

json.body @post.body

json.comments @post.comments do |comment|
  json.author do
    json.username comment.author.username
    json.authorId comment.author.id
  end

  json.body comment.body
end
