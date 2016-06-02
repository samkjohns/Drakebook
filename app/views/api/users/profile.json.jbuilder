json.extract! @user, :id, :username, :birth_date, :workplace
json.drakeships @user.drakeships do |drake|
  json.extract! drake, :id, :username
end
