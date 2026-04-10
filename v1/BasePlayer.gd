extends CharacterBody2D
class_name BasePlayer

## Handles synchronization and movement authority checks.

enum PlayerState { NORMAL, DOWNED, CARRIED, CONTAINED }

@export var speed: float = 300.0
@export var state: PlayerState = PlayerState.NORMAL

@onready var synchronizer: MultiplayerSynchronizer = $MultiplayerSynchronizer

func _ready():
	# Set the multiplayer authority to the peer ID that owns this node.
	# The name of the node is usually set to the peer_id by the spawner.
	set_multiplayer_authority(str(name).to_int())
	
	# Only the owner sees their own character as 'active' (optional UI logic)
	if is_multiplayer_authority():
		# setup_camera()
		pass

func _physics_process(_delta):
	# CRITICAL: Movement and states are processed by the authority
	if not is_multiplayer_authority():
		return
	
	# If downed or carried, movement is disabled
	if state != PlayerState.NORMAL:
		velocity = Vector2.ZERO
		move_and_slide()
		return
	
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	if direction:
		velocity = direction * speed
	else:
		velocity = velocity.move_toward(Vector2.ZERO, speed)

	move_and_slide()
