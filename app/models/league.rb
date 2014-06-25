class League < ActiveRecord::Base
  belongs_to :user
  has_many :days
  has_many :games, through: :days
  has_many :league_teams
  has_many :teams, through: :league_teams

  validates :name, :start_date, :end_date, presence: true
  validates_uniqueness_of :name, message: " taken please choose another name"
  before_destroy :destroy_children

  def destroy_children
  	Day.where(league_id: self.id).destroy_all
    Game.where(league_id: self.id).destroy_all
  end
  
end
