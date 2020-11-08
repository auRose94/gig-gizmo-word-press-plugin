<?php

/**
 * @package GigGizmo WordPress Plugin
 * @version 0.1.7
 */
/*
Plugin Name: GigGizmo WordPress Plugin
Plugin URI: http://giggizmo.com/plugins/wordpress/
Description: This is GigGizmo's WordPress Plugin. This will help you organize shows, bands, and your venues on your WordPress sites.
Author: Cory Noll Crimmins Golden
Version: 0.1.8
Author URI: https://mountainvalley.today/
*/

include_once "calendar_widget.php";

function gg_header_admin_init()
{
	wp_register_style("bootstrap.css", plugin_dir_url(__FILE__) . "/node_modules/bootstrap/dist/css/bootstrap.min.css", array(), "4.5.2", "all");

	wp_register_style("create-shows.css", plugin_dir_url(__FILE__) . "/stylesheets/create-shows.css", array(), "1.0.0", "all");

	wp_register_script("bootstrap.js", plugin_dir_url(__FILE__) . "/node_modules/bootstrap/dist/js/bootstrap.min.js", array("jquery"), "4.5.2"); // bootstrap

	wp_register_script("create-shows", plugin_dir_url(__FILE__) . "/js/create-shows.js", array("jquery"), "1.0.0");
}

function gg_header_admin_enqueue()
{
	wp_enqueue_script("bootstrap.js");
	wp_enqueue_script("popper");
	wp_enqueue_style("bootstrap.css");
}

function gg_header_admin_add_show_enqueue()
{
	gg_header_admin_enqueue();
	wp_enqueue_script("create-shows");
	wp_enqueue_style("create-shows.css");
}

function gg_widget_init()
{
	register_widget("CalendarWidget");
}

function gg_shows_page()
{
	include "shows_page.php";
}

function gg_add_shows_page()
{
	include "add_shows_page.php";
}


function gg_admin_menu()
{
	$showsPage = add_menu_page(
		'All Shows',
		'Shows',
		'edit_pages',
		'shows_page',
		'gg_shows_page',
		'dashicons-calendar-alt',
		30
	);
	$addShowsPage = add_submenu_page(
		'shows_page',
		"Create Show",
		"Add New",
		"edit_pages",
		"add_shows_page",
		"gg_add_shows_page"
	);

	add_action("admin_print_styles-{$showsPage}", 'gg_header_admin_enqueue');
	add_action("admin_print_styles-{$addShowsPage}", 'gg_header_admin_add_show_enqueue');
}


function compare_show_item($a, $b)
{
	$aStart = new DateTime($a["startTime"]);
	$bStart = new DateTime($b["startTime"]);
	if ($aStart == $bStart) {
		return 0;
	}
	return ($aStart < $bStart) ? -1 : 1;
}

function get_show_table()
{
	$current	=	get_option("show_table", array());
	$table = array();
	$today = new DateTime();
	$today->modify("-24 hours");
	for ($i = 0; $i < count($current); ++$i) {
		$add = true;
		$entry = $current[$i];
		if (empty($entry)) {
			$add = false;
		} else {
			$performers = $entry["performers"];
			if (is_array($performers) && count($performers) == 0) {
				$add = false;
			} else if (is_string($performers)) {
				if (strlen($performers) != 0) {
					$performers = array($performers);
				} else {
					$add = false;
				}
				$entry["performers"] = $performers;
			}
			try {
				$startTime = new DateTime($entry["startTime"]);
				$stopTime = new DateTime($entry["stopTime"]);
			} catch (Exception $error) {
				$startTime = false;
				$stopTime = false;
			}
			if ($startTime == false || $stopTime == false) {
				$add = false;
			} else if ($startTime < $today && $stopTime < $today) {
				$add = false;
			}
		}

		if ($add) {
			array_push($table, $entry);
		}
	}
	usort($table, "compare_show_item");
	return $table;
}

function remove_shows_post()
{
	if (isset($_POST['remove_shows_nonce']) && wp_verify_nonce($_POST['remove_shows_nonce'], 'remove_shows_nonce')) {
		$showTimes = get_show_table();
		$showCopy = array();
		$selected = $_POST["selected"];
		if (!empty($selected))
			foreach ($showTimes as $key => $entry) {
				$found = false;
				foreach ($selected as $value) {
					$index = intval($value);
					if ($key == $index) {
						$found = true;
						break;
					}
				}
				if (!$found) array_push($showCopy, $entry);
			}

		update_option("show_table", $showCopy, true);

		wp_redirect(admin_url('admin.php?page=shows_page'));
		exit;
	} else {
		wp_die(
			__('Invalid nonce specified', $Slug),
			__('Error', $Slug),
			array(
				'response'	=>	403,
				'back_link'	=>	'admin.php?page=shows_page',
			)
		);
	}
}

function create_shows_post()
{
	if (isset($_POST['create_shows_nonce']) && wp_verify_nonce($_POST['create_shows_nonce'], 'create_shows_nonce')) {
		// sanitize the input
		$performers = $_POST['performers'];
		$dates = array();
		$startTimes = array();
		$endTimes = array();
		foreach ($_POST as $key => $value) {
			if (strpos($key, 'date') !== false) {
				array_push($dates, $value);
			} else if (strpos($key, 'time-start') !== false) {
				array_push($startTimes, $value);
			} else if (strpos($key, 'time-stop') !== false) {
				array_push($endTimes, $value);
			}
		}
		// do the processing
		$showTimes = get_show_table();
		assert(count($dates) == count($startTimes));
		assert(count($dates) == count($endTimes));
		for ($i = 0; $i < count($dates); ++$i) {
			$startTime = $dates[$i] . " " . $startTimes[$i];
			$stopTime = $dates[$i] . " " . $endTimes[$i];
			array_push($showTimes, array(
				"performers"	=>	$performers,
				"startTime"		=>	$startTime,
				"stopTime"		=>	$stopTime
			));
		}
		update_option("show_table", $showTimes, true);
		echo json_encode($_POST);

		// redirect the user to the appropriate page
		wp_redirect(admin_url('admin.php?page=shows_page'));
		exit;
	} else {
		wp_die(
			__('Invalid nonce specified', $Slug),
			__('Error', $Slug),
			array(
				'response'	=>	403,
				'back_link'	=>	'admin.php?page=add_shows_page',
			)
		);
	}
}

function create_post_type_performer()
{
	register_taxonomy_for_object_type("category", "performer"); // Register Taxonomies for Category
	register_taxonomy_for_object_type("post_tag", "performer");
	register_post_type(
		"performer", // Register Custom Post Type
		array(
			"labels" => array(
				"name" => __("Performers", $Slug),
				"singular_name" => __("Performer", $Slug),
				"add_new" => __("Add New", $Slug),
				"add_new_item" => __("Add New Performer", $Slug),
				"edit_item" => __("Edit Performer", $Slug),
				"new_item" => __("New Performer", $Slug),
				"view_item" => __("View Performer", $Slug),
				"view_items" => __("View Performers", $Slug),
				"search_items" => __("Search Performers", $Slug),
				"not_found" => __("No Performers found", $Slug),
				"not_found_in_trash" => __("No Performers found in Trash", $Slug),
				"all_items"	=> __("All Performers", $Slug)
			),
			"publicly_queryable" => true,
			"menu_icon" => "dashicons-format-audio",
			"public" => true,
			"hierarchical" => true, // Allows your posts to behave like Hierarchy Pages
			"has_archive" => true,
			"supports" => array(
				"title",
				"editor",
				"author",
				"custom-fields",
				"comments",
				"page-attributes",
				"revisions",
				"excerpt",
				"thumbnail"
			), // Go to Dashboard Custom HTML5 Blank post for supports
			"can_export" => true, // Allows export in Tools > Export
			"taxonomies" => array(
				"post_tag",
				"category"
			) // Add Category and Post Tags support
		)
	);
}

function show_calendar_table_shortcode($atts)
{
	$data = get_show_table();
	ob_start();
?>
	<div class="calendar-table">
		<table class="table">
			<thead>
				<tr>
					<th scope="col"><?php echo __("Time"); ?></th>
					<th scope="col"><?php echo __("Performers"); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php
				for ($i = 0; $i < count($data); ++$i) {
					$odd = $i % 2 != 0;
					$item = $data[$i];
					$performers = $item["performers"];
					$starTime = new DateTime($item["startTime"]);
					$stopTime = new DateTime($item["stopTime"]);
				?>
					<tr class="<?php echo $odd ? "dark" : ""; ?>" id="item-<?php echo $i; ?>">
						<td>
							<?php
							$diff = $starTime->diff($stopTime);
							if ($diff->format('%a') === '0') {
								echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("g:ia");
							} else {
								echo $starTime->format("l F jS g:ia") . "-" . $stopTime->format("l F jS g:ia");
							}
							?>
						</td>
						<td>
							<?php
							for ($ip = 0; $ip < count($performers); ++$ip) {
								$performer = get_post($performers[$ip]);
							?>
								<a href="<?php echo get_post_permalink($performer); ?>">
									<?php echo $performer->post_title; ?>
								</a>
								<?php if (count($performers) - 1 > $ip)	echo ","; ?>
							<?php
							}
							?>
						</td>
					</tr>
				<?php
				}
				?>
			</tbody>
		</table>
	</div>
	<?php
	$output = ob_get_clean();
	ob_flush();
	return $output;
}


function performer_content_filter($content)
{
	if (get_post_type() == "performer") {
		ob_start();
		$shows = get_show_table();
		if (count($shows) > 0) {
	?>
			<table class="table table-hover table-sm">
				<thead class="thead-dark">
					<tr>
						<th scope="col">Start</th>
						<th scope="col">Stop</th>
						<th scope="col">Performing</th>
					</tr>
				</thead>
				<tbody>
					<?php
					for ($i = 0; $i < count($shows); ++$i) {
						$entry = $shows[$i];

						$performers = $entry["performers"];
						if (!in_array(get_the_ID(), $performers)) {
							continue;
						}

						$format = "F jS Y - g:ia";
					?>
						<tr>
							<th>
								<?php
								$startTime = new DateTime($entry["startTime"]);
								echo $startTime->format($format);
								?>
							</th>
							<th>
								<?php
								$startTime = new DateTime($entry["stopTime"]);
								echo $startTime->format($format);
								?>
							</th>
							<th>
								<?php
								for ($ci = 0; $ci < count($performers); ++$ci) {
									$performer = get_post($performers[$ci]);
									if ($performer) {
								?>
										<a href="<?php echo get_post_permalink($performer) ?>">
											<?php echo $performer->post_title; ?>
										</a>
										<?php
										if (count($performers) - 1 > $ci) {
											echo ",";
										} ?>
								<?php
									}
								}
								?>
							</th>
						</tr>
					<?php
					}
					?>
				</tbody>
			</table>
<?php
		}
		return ob_get_clean() . $content;
	}
	return $content;
}

add_action('admin_menu', 'gg_admin_menu');

add_action("admin_init", "gg_header_admin_init");
add_action("init", "create_post_type_performer"); // Add our HTML5 Blank Custom Post Type
add_action("widgets_init", "gg_widget_init"); // Remove inline Recent Comment Styles from wp_head()

add_action('admin_post_nopriv_create_shows_post', 'create_shows_post');
add_action('admin_post_create_shows_post', 'create_shows_post');

add_action("admin_post_nopriv_remove_shows_post", "remove_shows_post");
add_action("admin_post_remove_shows_post", "remove_shows_post");

add_shortcode("show_calendar_table", "show_calendar_table_shortcode");

add_filter('the_content', 'performer_content_filter');

?>