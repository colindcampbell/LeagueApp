class Stat < ActiveRecord::Base
  belongs_to :game
  belongs_to :player

  validate :unique_stat

  def unique_stat
  	existing_stat = Stat.where(player_id: self.player_id, game_id: self.game_id).first
  	if existing_stat
  		errors.add(:stat, '( This stat exists, please edit rather than add )')
  	end
  end
end
