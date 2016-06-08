# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160608132144) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "drakeships", force: :cascade do |t|
    t.integer  "requester_id",                          null: false
    t.integer  "recipient_id",                          null: false
    t.string   "relationship_type"
    t.string   "request_status",    default: "pending", null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  add_index "drakeships", ["recipient_id"], name: "index_drakeships_on_recipient_id", using: :btree
  add_index "drakeships", ["requester_id"], name: "index_drakeships_on_requester_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",     null: false
    t.integer  "postable_id",   null: false
    t.string   "postable_type", null: false
    t.text     "body",          null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree
  add_index "posts", ["postable_id"], name: "index_posts_on_postable_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",           null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.string   "profile_photo_path", null: false
    t.string   "cover_photo_path",   null: false
    t.date     "birth_date"
    t.string   "workplace"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "email"
    t.string   "phone_number"
    t.string   "hometown"
    t.string   "current_city"
    t.string   "high_school"
    t.string   "college"
    t.string   "college_major"
    t.text     "intro"
    t.string   "name_pronunciation"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
