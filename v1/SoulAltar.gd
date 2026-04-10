extends StaticBody2D

## SoulAltar.gd - Objective Logic
## Requires: Area2D (Detection), ProgressBar (Visual), MultiplayerSynchronizer (Sync)

@export var repair_speed: float = 10.0 # Percent per second
@export var progress: float = 0.0:
	set(val):
		progress = clamp(val, 0.0, 100.0)
		if progress_bar: progress_bar.value = progress

@onready var area_2d: Area2D = $Area2D
@onready var progress_bar: ProgressBar = $ProgressBar

var is_repaired: bool = false
var interacting_runner: BasePlayer = null

func _ready():
	progress_bar.visible = false
	area_2d.body_entered.connect(_on_body_entered)
	area_2d.body_exited.connect(_on_body_exited)

func _on_body_entered(body):
	if body is BasePlayer and body.state == BasePlayer.PlayerState.NORMAL:
		if body.is_multiplayer_authority():
			interacting_runner = body
			progress_bar.visible = true

func _on_body_exited(body):
	if body == interacting_runner:
		interacting_runner = null
		progress_bar.visible = progress > 0 and not is_repaired

func _process(delta):
	# Only the repairing player (authority of the runner) sends updates
	if interacting_runner and Input.is_action_pressed("ui_accept"): # Fixed: UI Accept is Hold to Repair
		if not is_repaired:
			_update_progress.rpc_id(1, repair_speed * delta) # RPC to server to update progress

@rpc("any_peer", "call_local")
func _update_progress(amount: float):
	if not multiplayer.is_server(): return
	
	progress += amount
	if progress >= 100.0 and not is_repaired:
		_complete_repair.rpc()

@rpc("call_local")
func _complete_repair():
	is_repaired = true
	progress = 100.0
	modulate = Color(1.2, 1.2, 0) # Glow when repaired
	print("Soul Altar REPAIRED!")
