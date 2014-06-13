class Player < ActiveRecord::Base
  belongs_to :team
  has_many :basketball_stats
  has_many :football_stats
  has_many :stats
end
