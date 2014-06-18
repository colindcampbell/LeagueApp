class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :home_city, :mascot, :user_id
  has_many :leagues, embed: :ids
  has_many :players

end
