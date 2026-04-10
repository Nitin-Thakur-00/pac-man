extends BasePlayer
class_name Hunter

## Hunter.gd
## Adds directional vision and audio terror radius.

@onready var vision_cone: PointLight2D = $VisionCone
@onready var terror_radius: AudioStreamPlayer2D = $TerrorRadiusPlayer
@onready var bite_area: Area2D = $BiteArea # Assumes an Area2D setup in editor

var is_dashing: bool = false
var dash_cooldown: float = 2.0
var can_dash: bool = true
var carried_runner: BasePlayer = null

func _ready():
	super._ready()
	# Ensure the light only shows for the Hunter's own view (optional)
	# But in asymmetrical games, sometimes the Hunter wants to know where they are looking.
	vision_cone.enabled = true
	
	# Start terror radius audio if it's not already playing (looping)
	if not terror_radius.playing:
		terror_radius.play()

func _physics_process(delta):
	# Movement authority check (from BasePlayer)
	if not is_multiplayer_authority():
		return
		
	_handle_input(delta)
	super._physics_process(delta)
	
	# Rotate the vision cone towards movement direction
	if velocity.length() > 0:
		var target_angle = velocity.angle()
		rotation = lerp_angle(rotation, target_angle, 10 * delta)

func _handle_input(delta):
	if Input.is_action_just_pressed("ui_accept") and can_dash: # Space/Enter
		_perform_dash()
	
	if Input.is_action_just_pressed("ui_focus_next"): # Tab or custom key for Carry
		_try_carry()

func _perform_dash():
	can_dash = false
	is_dashing = true
	var original_speed = speed
	speed *= 2.5 # Lunge speed
	
	# Check for bites during dash
	_check_bite()
	
	await get_tree().create_timer(0.3).timeout
	speed = original_speed
	is_dashing = false
	
	await get_tree().create_timer(dash_cooldown).timeout
	can_dash = true

func _check_bite():
	for body in bite_area.get_overlapping_bodies():
		if body is BasePlayer and body != self:
			body.rpc("set_player_downed")

func _try_carry():
	if carried_runner: return # Already carrying someone
	
	for body in bite_area.get_overlapping_bodies():
		if body is BasePlayer and body.state == PlayerState.DOWNED:
			_carry_runner(body)
			break

func _carry_runner(runner: BasePlayer):
	carried_runner = runner
	runner.rpc("set_player_carried", get_path())
	speed *= 0.85 # 15% reduction
