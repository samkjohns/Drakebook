# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Drakeship.destroy_all

usernames = [
  "Godzilla", "Sam", "Ambush Drake", "Drake", "Drake2", "Drake3", "Drake4", "Drake the Dragon",
  "Drakonia", "Drake Drake", "Ekardrake", "Draken", "Honorable Drake", "Dishonorable Drake"
]

usernames.each do |username|
  User.create!(
    username: username,
    password: "password"
  )
end

usernames.each_with_index do |username, i|
  usernames[i+1..-1].each_with_index do |drakename, j|
    requester = User.find_by(username: username)
    recipient = User.find_by(username: drakename)
    Drakeship.create!(
      requester_id: requester.id,
      recipient_id: recipient.id,
      request_status: "accepted"
    )
  end
end

p1 = Post.new
p1.author = User.first
p1.postable = User.last
p1.body = "This is my first post...__/~~~*^^^*~~~\\__"
p1.save!

p2 = Post.new
p2.author = User.last
p2.postable = p1
p2.body = "This is a reSPONse to your FIRST posT"
p2.save!
