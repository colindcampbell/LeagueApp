class LeagueSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :description, :user_id
  has_many :days
  has_many :teams

end 
