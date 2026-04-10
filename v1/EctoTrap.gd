extends Area2D

## EctoTrap.gd - Runner Defense Tool
## Reduces Hunter speed for 3 seconds upon entry.

@export var slowing_factor: float = 0.3 # Reduce to 30% (70% reduction)
@export var duration: float = 3.0

var triggered: bool = false

func _ready():
	body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D):
	if triggered: return
	
	if body is BasePlayer and body.name == "1": # Hunter is usually Peer 1
		_trigger_slow.rpc(body.get_path())
		triggered = true
		visible = false # Hide trap after trigger

@rpc("any_peer", "call_local")
func _trigger_slow(hunter_path: NodePath):
	var hunter = get_node(hunter_path)
	if not hunter: return
	
	var original_speed = hunter.speed
	hunter.speed *= slowing_factor
	print("Hunter SLOWED by Ecto-Trap!")
	
	# Wait for duration before restoring speed
	await get_tree().create_timer(duration).timeout
	
	if hunter:
		hunter.speed = original_speed # This is a bit naive if multiple traps hit, but works for base
		print("Hunter speed restored.")
	
	queue_free() # Remove trap from world
