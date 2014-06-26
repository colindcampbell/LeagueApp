class Player < ActiveRecord::Base
  belongs_to :team
  has_many :basketball_stats
  has_many :football_stats
  has_many :stats
  has_many :games, through: :stats

  before_destroy :destroy_children

  def destroy_children
  	Stat.where(player_id: self.id).destroy_all
  end
end
