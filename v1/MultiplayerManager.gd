extends Node

## MultiplayerManager.gd - Singleton (Autoload)
## Handles networking lifecycle and peer status.

const DEFAULT_PORT = 7000
const MAX_CLIENTS = 4 # 1 Host (Hunter) + 4 Clients (Runners) = 5 total

signal connection_failed
signal connection_succeeded
signal player_connected(peer_id: int)
signal player_disconnected(peer_id: int)
signal server_disconnected

var enet_peer = ENetMultiplayerPeer.new()

func host_game():
	var error = enet_peer.create_server(DEFAULT_PORT, MAX_CLIENTS)
	if error != OK:
		printerr("Failed to host: ", error)
		return
	
	multiplayer.multiplayer_peer = enet_peer
	multiplayer.peer_connected.connect(_on_player_connected)
	multiplayer.peer_disconnected.connect(_on_player_disconnected)
	
	print("Hosting on port ", DEFAULT_PORT)
	connection_succeeded.emit()

func join_game(address: String):
	if address.is_empty():
		address = "127.0.0.1"
	
	var error = enet_peer.create_client(address, DEFAULT_PORT)
	if error != OK:
		printerr("Failed to join: ", error)
		connection_failed.emit()
		return
	
	multiplayer.multiplayer_peer = enet_peer
	print("Joining address: ", address)

func _on_player_connected(id: int):
	player_connected.emit(id)

func _on_player_disconnected(id: int):
	player_disconnected.emit(id)
