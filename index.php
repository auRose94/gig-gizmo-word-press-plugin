<?php
/*
	@package     	GigGizmo-word-press-plugin
	@author      	GigGizmo (Cory Noll Crimmins - Golden)
	@copyright   	2018 Cory Noll Crimmins - Golden
	@wordpress-plugin
	Plugin Name: 	Gig Gizmo Show Calendar Shortcode
	Plugin URI: 	https://giggizmo.com/word-press-calendar/
	Description: 	Shortcode plugin to show gigs for bands and venues on pages and posts.
	Version: 			0.1.3
	Author: 			Cory Noll Crimmins - Golden
	Author URI: 	https://giggizmo.com
	Text Domain:	gig-gizmo-word-press-plugin
*/

function renderOnloadFunction($id, $band, $venue, $array) {
	return
		'function loadShowTable() {'.
			'const showTable ='.
				'GigGizmoWidget.default.widgets.ShowTable.new();'.
			'showTable.render({'.
				'id:"' . $id . '"'.
				'band:"' . $band . '",'.
				'venue:"' . $venue . '",'.
				'array:"' . $array . '"'.
			'});'.
		'}'.
		'if (window.attachEvent) {'.
			'window.attachEvent("onload", loadShowTable);'.
		'} else {'.
			'if (window.onload) {'.
				'var curronload = window.onload;'.
				'var newonload = function(evt) {'.
					'curronload(evt);'.
					'loadShowTable(evt);'.
				'};'.
				'window.onload = newonload;'.
			'} else {'.
				'window.onload = loadShowTable;'.
			'}'.
		'}';
}

function table_shortcode_func($atts) {
	$atts = shortcode_atts(array(
		'band' => '',
		'venue' => '',
		'array' => '',
		'id' => 'gig-gizmo-table'
	), $atts, '');
	$script = renderOnloadFunction(
		$atts['id'],
		$atts['band'],
		$atts['venue'],
		$atts['array']);
	// TODO?: Enque React and ReactDOM?
	wp_enqueue_script(
		'gig-gizmo-word-press-plugin',
		'wp-content/plugins/gig-gizmo-word-press-plugin/index.js',
		'',
		null,
		false);
	wp_add_inline_script('show-table', $script, 'after');
	return '<div id="' . $atts['id'] . '"/>';
}

add_shortcode(
	'gig-gizmo-table',
	'table_shortcode_func' );
?>
