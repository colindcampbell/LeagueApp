json.array!(@leagues) do |league|
  json.extract! league, :id
  json.url league_url(league, format: :json)
end
