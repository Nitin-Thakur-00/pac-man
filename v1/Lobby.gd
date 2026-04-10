extends Control

## Lobby.gd - Simple Networking UI
## Attach this to a Control node with Host/Join buttons and an Input field for IP.

@onready var address_input: LineEdit = $VBoxContainer/AddressInput
@onready var host_button: Button = $VBoxContainer/HostButton
@onready var join_button: Button = $VBoxContainer/JoinButton

func _ready():
	host_button.pressed.connect(_on_host_pressed)
	join_button.pressed.connect(_on_join_pressed)
	
	# Transition to game scene when connection is established
	MultiplayerManager.connection_succeeded.connect(_start_game)

func _on_host_pressed():
	MultiplayerManager.host_game()
	_start_game() # Host starts immediately

func _on_join_pressed():
	MultiplayerManager.join_game(address_input.text)

func _start_game():
	get_tree().change_scene_to_file("res://GameWorld.tscn")
