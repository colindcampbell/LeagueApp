class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :description, :user_id
  has_many :days, embed: :ids
  has_many :teams, embed: :ids
  has_many :games, embed: :ids

end 
