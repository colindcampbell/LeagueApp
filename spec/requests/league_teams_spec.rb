require 'rails_helper'

RSpec.describe "LeagueTeams", :type => :request do
  describe "GET /league_teams" do
    it "works! (now write some real specs)" do
      get league_teams_path
      expect(response.status).to be(200)
    end
  end
end