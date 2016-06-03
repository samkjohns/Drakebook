# json.extract! @user, :id, :username, :birth_date, :workplace
json.partial! "api/users/user", user: @user
