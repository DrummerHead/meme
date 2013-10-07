require 'webrick'
include WEBrick

local_magia = HTTPServer.new(
  :Port => 8080,
  :DocumentRoot => "."
)

trap("INT") {
  local_magia.shutdown
}

local_magia.start
