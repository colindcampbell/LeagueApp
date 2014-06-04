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

ActiveRecord::Schema.define(version: 20140604024632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: true do |t|
    t.date     "date"
    t.integer  "league_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "days", ["league_id"], name: "index_days_on_league_id", using: :btree

  create_table "games", force: true do |t|
    t.string   "location"
    t.time     "time"
    t.string   "sport"
    t.integer  "home_score"
    t.integer  "away_score"
    t.boolean  "recorded"
    t.boolean  "final"
    t.boolean  "half"
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.boolean  "ot"
    t.integer  "day_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "games", ["day_id"], name: "index_games_on_day_id", using: :btree

  create_table "leagues", force: true do |t|
    t.string   "name"
    t.string   "locations"
    t.date     "start_date"
    t.date     "end_date"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "leagues", ["user_id"], name: "index_leagues_on_user_id", using: :btree

  create_table "players", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "height"
    t.float    "weight"
    t.string   "position"
    t.integer  "team_id"
    t.integer  "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "players", ["team_id"], name: "index_players_on_team_id", using: :btree

  create_table "teams", force: true do |t|
    t.string   "name"
    t.integer  "wins"
    t.integer  "losses"
    t.integer  "ties"
    t.string   "coach_name"
    t.string   "coach_email"
    t.string   "coach_phone"
    t.string   "home_city"
    t.integer  "league_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "teams", ["league_id"], name: "index_teams_on_league_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "username"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
  end

end
