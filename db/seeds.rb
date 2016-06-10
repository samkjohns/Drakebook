# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

usernames = [
  "Ambush Drake", "Drake the Dragon",
  "Drakonia", "Drake Drake", "Ekardrake", "Draken", "Honorable Drake", "Dishonorable Drake"
]

# seededUsers = usernames.map do |username|
#   User.create!(
#     username: username,
#     password: "password"
#   )
# end

usernames.each_with_index do |username, i|
  user = User.find_by(username: username)
  if user
    usernames[i+1..-1].each_with_index do |drakename, j|
      requester = user
      recipient = User.find_by(username: drakename)
      Drakeship.create(
        requester_id: requester.id,
        recipient_id: recipient.id,
        request_status: "accepted"
      )
    end

    5.times do
      # create a post
      userWall = User.all.shuffle.first
      randomWord = [
        "banana", "apple", "NOT THE BEEEES", "whatever", "IF YOU REALLY WANNA KNOW CLAP YOUR hands",
        "seed", "wat", "no", "yes", "how you doin", "fun!", "sennacy is great", "buses",
        "mice are meat", 'tell no one', 'tell everyone', 'si se puede', 'thanks obama'
      ].shuffle.first

      Post.create(
        author_id: user.id,
        postable_type: "User",
        postable_id: userWall.id,
        body: "I am #{user.username} and I'm posting on #{userWall}'s wall. #{randomWord}"
      )

      # find a random Post and comment on it
      randomPost = Post.all.shuffle.first
      Post.create(
        author_id: user.id,
        postable_type: "Post",
        postable_id: randomPost.id,
        body: "Comment comment #{randomWord} commenting on the post!!!"
      )
    end
  end
end
