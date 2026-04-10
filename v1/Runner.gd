extends BasePlayer
class_name Runner

## Runner.gd
## Adds personal vision and audio listener.

@onready var personal_light: PointLight2D = $PersonalLight
@onready var audio_listener: AudioListener2D = $AudioListener2D

var carrier: Node2D = null

func _ready():
	super._ready()
	
	# ONLY the client controlling THIS runner should have the listener active
	if is_multiplayer_authority():
		audio_listener.make_current()
		personal_light.enabled = true
	else:
		personal_light.enabled = false

func _physics_process(delta):
	if state == PlayerState.CARRIED and carrier:
		global_position = carrier.global_position
		return
		
	super._physics_process(delta)
	
	if is_multiplayer_authority() and state == PlayerState.NORMAL:
		if Input.is_action_just_pressed("ui_text_backspace"): # Default Shift/Backspace for Trap
			_request_spawn_trap.rpc_id(1)

@rpc("any_peer", "call_local")
func _request_spawn_trap():
	if not multiplayer.is_server(): return
	# Logic to spawn the trap via GameWorld's spawner or as a direct child
	# Usually, you'd emit a signal to GameWorld here
	get_parent().rpc("spawn_trap_at", global_position)

@rpc("any_peer", "call_local")
func set_player_downed():
	state = PlayerState.DOWNED
	modulate = Color(0.5, 0.5, 0.5) # Gray out when downed
	print(name, " is DOWNED!")

@rpc("any_peer", "call_local")
func set_player_carried(carrier_path: NodePath):
	state = PlayerState.CARRIED
	carrier = get_node(carrier_path)
	modulate = Color(0.8, 0.2, 0.8) # Purple when carried
	collision_layer = 0 # Disable collision while carried
	print(name, " is being CARRIED!")

@rpc("any_peer", "call_local")
func set_player_contained(zone_path: NodePath):
	state = PlayerState.CONTAINED
	carrier = null
	var zone = get_node(zone_path)
	global_position = zone.get_node("SpawnPos").global_position
	modulate = Color(1, 0, 0) # Red flash for containment
	print(name, " is CONTAINED!")

@rpc("any_peer", "call_local")
func set_player_normal():
	state = PlayerState.NORMAL
	carrier = null
	modulate = Color(1, 1, 1) # Reset color
	collision_layer = 1 | 4 # Restore collision
	print(name, " is RESCUED/NORMAL!")
	modulate = Color(1, 1, 1) # Reset color
	collision_layer = 1 | 4 # Restore collision
	print(name, " is RESCUED/NORMAL!")
