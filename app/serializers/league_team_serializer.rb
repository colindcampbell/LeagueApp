class LeagueTeamSerializer < ActiveModel::Serializer
  attributes :id, :team_id, :league_id, :wins, :losses
end
