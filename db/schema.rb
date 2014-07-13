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

ActiveRecord::Schema.define(version: 20140712184925) do

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
    t.time     "time"
    t.string   "sport"
    t.integer  "home_score"
    t.integer  "away_score"
    t.boolean  "recorded"
    t.boolean  "final"
    t.boolean  "half"
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.integer  "day_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "ot"
    t.string   "location"
    t.datetime "date"
    t.integer  "league_id"
    t.integer  "home_league_team_id"
    t.integer  "away_league_team_id"
  end

  add_index "games", ["day_id"], name: "index_games_on_day_id", using: :btree
  add_index "games", ["league_id"], name: "index_games_on_league_id", using: :btree

  create_table "league_teams", force: true do |t|
    t.integer  "team_id"
    t.integer  "league_id"
    t.boolean  "paid"
    t.integer  "place"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "wins"
    t.integer  "losses"
  end

  add_index "league_teams", ["league_id"], name: "index_league_teams_on_league_id", using: :btree
  add_index "league_teams", ["team_id"], name: "index_league_teams_on_team_id", using: :btree

  create_table "leagues", force: true do |t|
    t.string   "name"
    t.string   "locations"
    t.date     "start_date"
    t.date     "end_date"
    t.text     "description"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
    t.string   "sport"
  end

  add_index "leagues", ["user_id"], name: "index_leagues_on_user_id", using: :btree

  create_table "locations", force: true do |t|
    t.string   "address"
    t.float    "lat"
    t.float    "long"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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

  create_table "stats", force: true do |t|
    t.integer  "game_id"
    t.integer  "player_id"
    t.integer  "points"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "assists"
    t.integer  "defensive_rebounds"
    t.integer  "field_goals"
    t.integer  "fg_attempts"
    t.integer  "fouls"
    t.integer  "blocks"
    t.integer  "threes"
    t.integer  "turnovers"
    t.integer  "touchdowns"
    t.integer  "pass_yards"
    t.integer  "rush_yards"
    t.integer  "receiving_yards"
    t.integer  "tackles"
    t.integer  "sacks"
    t.integer  "interceptions"
    t.integer  "fumbles"
    t.integer  "steals"
    t.integer  "freethrows_made"
    t.integer  "freethrows_attempted"
    t.integer  "offensive_rebounds"
  end

  add_index "stats", ["game_id"], name: "index_stats_on_game_id", using: :btree
  add_index "stats", ["player_id"], name: "index_stats_on_player_id", using: :btree

  create_table "teams", force: true do |t|
    t.string   "name"
    t.integer  "wins"
    t.integer  "losses"
    t.integer  "ties"
    t.string   "home_city"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "mascot"
    t.string   "coach"
    t.string   "email"
    t.string   "phone"
  end

  add_index "teams", ["user_id"], name: "index_teams_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "username"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "phone"
    t.string   "user_type"
  end

end
