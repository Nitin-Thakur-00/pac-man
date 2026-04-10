extends Node2D

## GameWorld.gd - Spawning Logic
## Manages spawning of Hunter and Runners using MultiplayerSpawner.

@export var hunter_scene: PackedScene = preload("res://Hunter.tscn")
@export var runner_scene: PackedScene = preload("res://Runner.tscn")

@onready var spawner: MultiplayerSpawner = $MultiplayerSpawner
@onready var spawn_points_hunter: Node2D = $SpawnPoints/Hunter
@onready var spawn_points_runner: Node2D = $SpawnPoints/Runner

func _ready():
	# Setup Global Darkness
	var darkness = CanvasModulate.new()
	darkness.color = Color(0.02, 0.02, 0.05) # Very dark blue/black
	add_child(darkness)
	
	# Configure spawner
	spawner.spawn_function = _spawn_player
	
	# If we are the server (host), spawn ourselves first
	if multiplayer.is_server():
		_on_player_connected(1)
		# Connect to subsequent peers
		multiplayer.peer_connected.connect(_on_player_connected)
		multiplayer.peer_disconnected.connect(_on_player_disconnected)

func _on_player_connected(id: int):
	# Only server handles spawning
	if not multiplayer.is_server():
		return
	
	# The first player (id 1) is usually the Hunter
	# Subsequent players are Runners
	var scene_to_spawn = hunter_scene if id == 1 else runner_scene
	spawner.spawn({"id": id, "scene": scene_to_spawn})

func _spawn_player(data: Dictionary):
	var id = data["id"]
	var scene = data["scene"]
	
	var p = scene.instantiate()
	p.name = str(id) # Name must be the peer ID for authority checks
	
	# Assign position based on role
	if id == 1:
		p.global_position = spawn_points_hunter.get_child(0).global_position
	else:
		# Randomly pick a runner spawn point (simple logic)
		var index = (id % spawn_points_runner.get_child_count())
		p.global_position = spawn_points_runner.get_child(index).global_position
		
	return p

@rpc("any_peer", "call_local")
func spawn_trap_at(pos: Vector2):
	if not multiplayer.is_server(): return
	var trap_scene = preload("res://EctoTrap.tscn")
	var trap = trap_scene.instantiate()
	trap.global_position = pos
	add_child(trap, true)
	print("Trap spawned at ", pos)

func _on_player_disconnected(id: int):
	if has_node(str(id)):
		get_node(str(id)).queue_free()
