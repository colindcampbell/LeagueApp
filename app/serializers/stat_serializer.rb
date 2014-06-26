class StatSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :game_id, :points, :offensive_rebounds, :defensive_rebounds, :assists, :blocks, :steals, :fouls
end
