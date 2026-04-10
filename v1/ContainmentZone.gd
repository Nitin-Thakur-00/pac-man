extends Area2D

## ContainmentZone.gd - Sacrifice/Rescue logic
## Requires: Area2D (Self)

@onready var spawn_pos: Marker2D = $SpawnPos # Where the runner is placed when contained

var contained_runner: BasePlayer = null

func _ready():
	body_entered.connect(_on_body_entered)
	body_exited.connect(_on_body_exited)

func _on_body_entered(body: Node2D):
	if body is BasePlayer:
		# Hunter logic: Try to deposit if carrying someone
		if body is Hunter and body.carried_runner and body.is_multiplayer_authority():
			# Show UI cue for "Deposit"
			pass
		
		# Runner logic: Try to rescue if someone is inside
		elif body is Runner and contained_runner and body.is_multiplayer_authority():
			# Show UI cue for "Rescue"
			pass

func _on_body_exited(body: Node2D):
	# Hide UI cues
	pass

func _process(delta):
	# Check for "Interaction" in area
	for body in get_overlapping_bodies():
		if not body is BasePlayer or not body.is_multiplayer_authority(): continue
		
		# Hunter deposition
		if body is Hunter and body.carried_runner and Input.is_action_just_pressed("ui_focus_next"):
			_deposit_runner.rpc_id(1, body.get_path())
			break
			
		# Runner rescue
		if body is Runner and contained_runner and Input.is_action_just_pressed("ui_accept"):
			_rescue_runner.rpc_id(1)
			break

@rpc("any_peer", "call_local")
func _deposit_runner(hunter_path: NodePath):
	if not multiplayer.is_server(): return
	var hunter = get_node(hunter_path)
	var runner = hunter.carried_runner
	
	if runner:
		contained_runner = runner
		hunter.carried_runner = null
		hunter.speed /= 0.85 # Reset speed
		
		runner.rpc("set_player_contained", get_path())
		print("Runner CONTAINED in zone!")

@rpc("any_peer", "call_local")
func _rescue_runner():
	if not multiplayer.is_server(): return
	if contained_runner:
		contained_runner.rpc("set_player_normal")
		contained_runner = null
		print("Runner RESCUED!")
