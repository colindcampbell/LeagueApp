class GameSerializer < ActiveModel::Serializer
  attributes :id, :day_id, :home_team_id, :away_team_id
end
