class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :description, :user_id, :locations, :sport
  has_many :days, order: 'date'
  has_many :teams
  has_many :games, through: :days

end 
